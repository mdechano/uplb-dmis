import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/CompleteManagerProfile.css';
import NavBar from './NavBar';

function CompleteManagerProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [fileData, setFileData] = useState();
    const [fileId, setFileId] = useState();
    let allEmails = []
 
    const fetchData = () => {
        const getManagers = axios.get(apiUrl("/manager"), { withCredentials: true });
        axios.all([getManagers]).then(
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

    const sendData = (e) => {
        e.preventDefault();
        var tempEmail = document.getElementById("email").value;
        var notuniqueEmail = checkEmailExists(tempEmail);

        if (notuniqueEmail === false) {
            allEmails.push(tempEmail);

            fetch(apiUrl("/manager"),{
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
                    picture_id: fileId
                })
            })
            .then(response => {return response.json()})
            .then(getManagers)
        } else {
            alert("Inputted email address already exists!");
        }
    }

    const getManagers = () => {
        const getManager = axios.get(apiUrl("/manager"), { withCredentials: true });
        axios.all([getManager]).then(
            axios.spread((...allData) => {
                sendDormInfo(allData[0].data)
            })
        )
    }

    const sendDormInfo = (manager) => {
        
        if (manager !== undefined) {
            manager.map((person, i) => {
                if(i === (manager.length - 1)){
                    fetch(apiUrl("/dorm/"),{
                        method: "POST",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            dorm_name: user.dorm,
                            dorm_manager_id: person._id,
                            dorm_manager_name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                            dorm_manager_email: document.getElementById("email").value,
                            dorm_manager_contact_number: document.getElementById("contact_number").value,
                            office_hours_start: document.getElementById("office_hours_start").value,
                            office_hours_end: document.getElementById("office_hours_end").value,
                            late_permit_start: document.getElementById("late_permit_start").value,
                            late_permit_end: document.getElementById("late_permit_end").value,
                            overnight_permit_start: document.getElementById("overnight_permit_start").value,
                            overnight_permit_end: document.getElementById("overnight_permit_end").value,
                            stayover_permit_start: document.getElementById("stayover_permit_start").value
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
            alert("Successfully completed manager profile and submitted dorm information."),
            setTimeout(function(){
                window.location.reload();
             }, 1000)
        )
    }

    const fileChangeHandler = (e) => {
        console.log(e.target.files[0]);
        setFileData(e.target.files[0]);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
    
        // Handle File Data from the state Before Sending
        const data = new FormData();
        data.append("image", fileData);

        console.log(data);
    
        fetch(apiUrl("/picture"), {
          method: "POST",
          body: data,
        }).then((response) => response.json())
        .then((result) => {
            setFileId(result.id);
            console.log(result.id);
        });
    };

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
        }
    },[]);

    return (
        <div>
            <NavBar></NavBar>
            <div classname = 'complete-manager-profile-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>COMPLETE MANAGER PROFILE</p>
                    <button className='save-button' onClick={sendData}>SAVE</button>
                </div>
                <hr className='divider'></hr>
                <div className="body-div">
                    <div className='left-div'>
                        <form className='upload-div'>
                            <div className='upload-body'>
                                <input className='upload-img-file' type="file" onChange={fileChangeHandler} ></input>
                                <br></br>
                                <br></br>
                                <br></br>
                                <button className='upload-img-submit' type="submit" onClick={onSubmitHandler} >SUBMIT</button>
                            </div>
                            <div className='upload-note'>
                                Upload Picture Here<br></br>(1x1 or 2x2)
                            </div>
                        </form>
                    </div>

                    <div className="right-div">
                        <form className="form-div">
                            <div className="form-div-personal">
                                <h2 className='section-label'>PERSONAL INFORMATION</h2>
                                <table className='info-table'>
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
                                            <select className='custom-select-sex' id="sex" name="sex">
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

                                <h2 className='section-label'>DORM INFORMATION</h2>
                                <p className='paragraph'>Complete dorm information here.</p>
                                <table className='dorm-info-table'>
                                    <div className='dorm-info-table-left'>
                                        <tr className='table-row'>
                                        <td className='cell-title'>Residence Hall Name</td>
                                        </tr>
                                        { user ?
                                        <tr className='table-row'>
                                            <td className='cell-input'>{user.dorm}</td>
                                        </tr>
                                        : ""}
                                        
                                        <tr className='table-row'>
                                        <td className='cell-title'>Office Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-input'>FROM <input type='time' id='office_hours_start'></input></td>
                                            <td className='cell-input'>TO <input type='time' id='office_hours_end'></input></td>
                                        </tr>
                                    </div>
                                    
                                    <div className='dorm-info-table-right'>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Late Permit Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                        <td className='cell-input'>FROM <input type='time' id='late_permit_start'></input></td>
                                            <td className='cell-input'>TO <input type='time' id='late_permit_end'></input></td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Overnight Permit Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                        <td className='cell-input'>FROM <input type='time' id='overnight_permit_start'></input></td>
                                            <td className='cell-input'>TO <input type='time' id='overnight_permit_end'></input></td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Stayover/Homebound Permit Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-input'>FROM <input type='time' id='stayover_permit_start'></input></td>
                                        </tr>
                                    </div>
                                    
                                </table>

                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CompleteManagerProfile;