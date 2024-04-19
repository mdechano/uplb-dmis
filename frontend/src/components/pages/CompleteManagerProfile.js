import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetPersonal.css';
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
        e.prevenDefault();
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
                    // upload_id: 
                })
            })
            .then(response => {return response.json()})
            .then(getDorm)
        } else {
            alert("Inputted email address already exists!");
        }
    }

    const getDorm = () => {
        const getDorm = axios.get(apiUrl("/dorm"), { withCredentials: true });
        axios.all([getDorm]).then(
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
                            dorm_name: document.getElementById("dorm_name").value,
                            dorm_details: document.getElementById("dorm_details").value,
                            dorm_manager_id: person._id,
                            dorm_manager_name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value + " " + document.getElementById("suffix"),
                            dorm_manager_email: document.getElementById("email").value,
                            dorm_manager_contact_number: document.getElementById("contact_number").value
                        })
                    })
                    .then(response => {return response.json()})
                }
            }) 
        }
    }

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
            <div classname = 'stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>COMPLETE PROFILE</p>
                    <button className='save-button' onClick={sendData}>SAVE</button>
                </div>
                <div className="body-div">
                    <div className='left-div'>
                        <div className='student-div'>
                            <div className='image-div'>
                                image here
                            </div>
                            <div className='profile-info'>
                                <p>ANNA DELA CRUZ</p>
                                <p>2019-08206</p>
                                <p>ROOM NO. 1209</p>
                                <p>ROLE</p>
                            </div>
                        </div>
                       
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

                                <h2>COMPLETE DORM INFORMATION HERE</h2>
                                <table>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Residence Hall Name</td>
                                        <td className='cell-title'>Dorm Details</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='dorm_name' name='dorm_name'></input></td>
                                        <td className='cell-input'><input type='text' id='dorm_details' name='dorm_details'></input></td>
                                    </tr>

                                    {/* <p>Please provide information of your dorm attendant.</p>
                                    
                                    <tr className='table-row'>
                                        <td className='cell-title'>Dorm Attendant Name</td>
                                        <td className='cell-title'>Dorm Attendant Email</td>
                                        <td className='cell-title'>Dorm Attendant Contact Number</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='dorm_attendant_name' name='dorm_attendant_name'></input></td>
                                        <td className='cell-input'><input type='text' id='dorm_attendant_email' name='dorm_attendant_email'></input></td>
                                        <td className='cell-input'><input type='text' id='dorm_attendant_contact_number' name='dorm_attendant_contact_number'></input></td>
                                    </tr> */}
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