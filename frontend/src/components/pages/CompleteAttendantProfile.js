import {React, useEffect, useState} from 'react';
import {Link, UNSAFE_DataRouterContext, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios, { all } from "axios";
import '../css/StudentInfoSheetPersonal.css';
import NavBar from './NavBar';

function CompleteAttendantProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [fileData, setFileData] = useState();
    const [fileId, setFileId] = useState();
    const [dorm, setDorm] = useState();

    let allEmails = []
 
    const fetchData = () => {
        const getAttendants = axios.get(apiUrl("/attendant"), { withCredentials: true });
        axios.all([getAttendants]).then(
            axios.spread((...allData) => {
                for (let i = 0; i < allData[0].data.length; i++) {
                    allEmails.push(allData[0].data[i].email)
                }
            })
        )
        console.log(allEmails);
    }

    const checkEmailExists = (tempEmail) => {
        if (allEmails.includes(tempEmail)) {
            return true;
        } else {
            return false;
        }
    }

    // sendData here

    const sendData = (e) => {
        e.preventDefault();
        var tempEmail = document.getElementById("email").value;
        var notuniqueEmail = checkEmailExists(tempEmail);

        if (notuniqueEmail === false) {
            allEmails.push(tempEmail);

            fetch(apiUrl("/attendant"),{
                method: "POST",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user_id: user._id,
                    dorm: user.dorm,
                    role: user.role,
                    first_name: document.getElementById("first_name").value,
                    last_name: document.getElementById("last_name").value,
                    middle_name: document.getElementById("middle_name").value,
                    suffix: document.getElementById("suffix").value,
                    sex: document.getElementById("sex").value,
                    birthday: document.getElementById("birthday").value,
                    contact_number: document.getElementById("contact_number").value,
                    email: document.getElementById("email").value,
                    home_address: document.getElementById("home_address").value,
                    // upload_id: 
                })
            })
            .then(response => {return response.json()})
            .then(editDorm)
        } else {
            alert("Inputted email address already exists!");
        }
    }

    const editDorm = () => {
        const getDorm = axios.get(apiUrl("/dorm"), { withCredentials: true });
        const getAttendant = axios.get(apiUrl("/attendant"), { withCredentials: true });
        axios.all([getDorm, getAttendant]).then(
            axios.spread((...allData) => {
                const allDormData = allData[0].data
                const allAttendantData = allData[1].data
                setDorm(allDormData)
                editDormInfo(allAttendantData)
            })
        )
    }

    const editDormInfo = (attendant) => {

        if (attendant !== undefined) {
            attendant.map((person, i) => {
                if(i === (attendant.length - 1)) {
                    console.log(i)
                    console.log("Attendant Name: " + person.first_name)
                    console.log("Attendant dorm: " + person.dorm)

                    if (dorm !== undefined) {
                        dorm.map((dorm, i) => {
                            // console.log(dorm.dorm_name)

                            if (person.dorm === dorm.dorm_name) {
                                const currentPerson = person
                                const currentDorm = dorm
                                // working well
                                // console.log(currentPerson._id)
                                // console.log(currentDorm._id)

                                fetch(apiUrl("/dorm/"+currentDorm._id),{
                                    method: "PUT",
                                    credentials:'include',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    body: JSON.stringify({
                                        dorm_name: currentDorm.dorm_name,
                                        dorm_details: currentDorm.dorm_details,
                                        dorm_manager_id: currentDorm.dorm_manager_id,
                                        dorm_manager_name: currentDorm.dorm_manager_name,
                                        dorm_manager_email: currentDorm.dorm_manager_email,
                                        dorm_manager_contact_number: currentDorm.dorm_manager_contact_number,
                                        office_hours_start: currentDorm.office_hours_start,
                                        office_hours_end: currentDorm.office_hours_end,
                                        late_permit_start: currentDorm.late_permit_start,
                                        late_permit_end: currentDorm.late_permit_end,
                                        overnight_permit_start: currentDorm.overnight_permit_start,
                                        overnight_permit_end: currentDorm.overnight_permit_end,
                                        stayover_permit_start: currentDorm.stayover_permit_start,
                                        dorm_attendant_id: currentPerson._id,
                                        dorm_attendant_name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                                        dorm_attendant_email: document.getElementById("email").value,
                                        dorm_attendant_contact_number: document.getElementById("contact_number").value
                                    })
                                })
                                .then(response => {return response.json()})
                                .then(
                                    changeCompletedProfile(user)
                                )
                            }
                        })
                    }
                }
            }) 
        }
    }

    const changeCompletedProfile = (person) => {
        fetch(apiUrl("/user/change-completed-profile"), {
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: person.email,
                completed_profile: true
            })
        })
        .then(response => {return response.json()})
        .then(
            alert("Successfully completed attendant profile."),
            setTimeout(function(){
                window.location.reload();
             }, 1000)
        )
    }

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
        }
    },[]);

    return(
        <div>
            <NavBar></NavBar>
            <div classname = 'stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>COMPLETE PROFILE</p>
                    <button className='save-button' onClick={sendData}>SAVE</button>
                </div>
                <div className="body-div">
                    <div className='left-div'>
                    <form className='upload-div'>
                            <div className='upload-body'>
                                <input className='upload-img-file' type="file"></input>
                                <br></br>
                                <br></br>
                                <br></br>
                                <button className='upload-img-submit' type="submit">SUBMIT</button>
                            </div>
                            <div className='upload-note'>
                                Upload Picture Here<br></br>(1x1 or 2x2)
                            </div>
                        </form>
                       
                    </div>
                    <div className="right-div">
                        <form className="form-div">
                            <div className="form-div-personal">
                                <h2>PERSONAL STUFF</h2>
                                <table>
                                    <tr className='table-row'>
                                        <td className='cell-title'>First Name</td>
                                        <td className='cell-title'>Middle Name</td>
                                        <td className='cell-title'>Last Name</td>
                                        <td className='cell-title'>Suffix</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type="text" id="first_name" name="firstname"></input></td>
                                        <td className='cell-input'><input type="text" id="middle_name" name="middlename"></input></td>
                                        <td className='cell-input'><input type="text" id="last_name" name="lastname"></input></td>
                                        <td className='cell-input'><input type="text" id="suffix" name="suffix"></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Assigned Sex</td>
                                        <td className='cell-title'>Birthday</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'>
                                            <select id="sex" name="sex">
                                                <option>Select Sex</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="intersex">Intersex</option>
                                            </select>
                                        </td>
                                        <td className='cell-input'><input type='date' id='birthday' name='birthday'></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Contact Number</td>
                                        <td className='cell-title'>Email</td>
                                        <td className='cell-title'>Home Address</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='contact_number' name='contactnumber'></input></td>
                                        <td className='cell-input'><input type='text' id='email' name='email'></input></td>
                                        <td className='cell-input'><input type='text' id='home_address' name='address'></input></td>
                                        
                                        
                                    </tr>
                                
                                </table>

                                
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CompleteAttendantProfile;