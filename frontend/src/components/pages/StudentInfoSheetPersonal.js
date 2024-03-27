import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetPersonal.css';
import NavBar from './NavBar';

function StudentInfoSheetPersonal () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [fileData, setFileData] = useState();
    const [fileId, setFileId] = useState();
    let allEmails = []

    // const fetchData = () => {
    //     const getResidents = axios.get(apiUrl("/resident"), { withCredentials: true });
    //     axios.all([getResidents]).then(
    //         axios.spread((...allData) => {
    //             for (let i = 0; i < allData[0].data.length; i++) {
    //                 allEmails.push(allData[0].data[i].email)
    //             }
    //         })
    //     )
    // }

    // const checkEmailExists = (tempEmail) => {
    //     if (allEmails.includes(tempEmail)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    const sendData = (e) => {
        e.preventDefault();
        // var tempEmail = document.getElementById("email").value;
        // var notuniqueEmail = checkEmailExists(tempEmail);

        // if (notuniqueEmail === false) {
        //     allEmails.push(tempEmail);

        //     fetch(apiUrl("/resident"),{
        //         method: "POST",
        //         credentials:'include',
        //         headers:{
        //             'Content-Type':'application/json'
        //         },
        //         body: JSON.stringify({
        //             first_name: document.getElementById("first_name").value,
        //             last_name: document.getElementById("last_name").value,
        //             middle_name: document.getElementById("middle_name").value,
        //             suffix: document.getElementById("suffix").value,
        //             sex: document.getElementById("sex").value,
        //             student_no: document.getElementById("student_no").value,
        //             civil_status: document.getElementById("civil_status").value,
        //             birthday: document.getElementById("birthday").value,
        //             contact_number: document.getElementById("contact_number").value,
        //             email:document.getElementById("email").value,
        //             address: document.getElementById("address").value,
        //             region: document.getElementById("region").value,
        //             college: document.getElementById("college").value,
        //             degree_program: document.getElementById("degree_program").value,
        //             last_school_attended: document.getElementById("last_school_attended").value,
        //             classification: document.getElementById("classification").value,
        //             honors_received: document.getElementById("honors_received").value,
        //             talents: document.getElementById("talents").value,
        //             hobbies: document.getElementById("hobbies").value,
        //             organizations: document.getElementById("organizations").value,
        //             ailments: document.getElementById("ailments").value,
        //             medications: document.getElementById("medications").value,
        //             scholarships: document.getElementById("scholarships").value,
        //             monthly_stipend: document.getElementById("monthly_stipend").value,
        //         })
        //     })
        //     .then(response => {return response.json()})
        // } else {
        //     alert("Inputted email address already exists!");
        // }

        fetch(apiUrl("/resident"),{
            method: "POST",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                middle_name: document.getElementById("middle_name").value,
                suffix: document.getElementById("suffix").value,
                sex: document.getElementById("sex").value,
                student_no: document.getElementById("student_no").value,
                civil_status: document.getElementById("civil_status").value,
                birthday: document.getElementById("birthday").value,
                contact_number: document.getElementById("contact_number").value,
                email:document.getElementById("email").value,
                home_address: document.getElementById("home_address").value,
                region: document.getElementById("region").value,
                college: document.getElementById("college").value,
                degree_program: document.getElementById("degree_program").value,
                last_school_attended: document.getElementById("last_school_attended").value,
                classification: document.getElementById("classification").value,
                honors_received: document.getElementById("honors_received").value,
                talents: document.getElementById("talents").value,
                hobbies: document.getElementById("hobbies").value,
                organizations: document.getElementById("organizations").value,
                ailments: document.getElementById("ailments").value,
                medications: document.getElementById("medications").value,
                scholarships: document.getElementById("scholarships").value,
                monthly_stipend: document.getElementById("monthly_stipend").value
            })
        })
        .then(response => {return response.json()})
    }

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        // else {
        //     fetchData()
        // }
    },[]);

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button'>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <button className='save-button' onClick = {sendData}>SAVE</button>
                </div>
                <div className='body-div'>
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
                        <div className='nav-div'>
                            <button className='stud-info-sheet-nav-personal'><Link to='/student-info-sheet-personal'><a className='info-sheet-btn'>PERSONAL</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                        {/* <button className='save-button' onClick = {sendData}>SAVE</button> */}
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
                                    <td className='cell-title'>Student Number</td>
                                    <td className='cell-title'>Civil Status</td>
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
                                    <td className='cell-input'><input type="text" id="student_no" name="studentnum"></input></td>
                                    <td className='cell-input'><input type="text" id="civil_status" name="civilstatus"></input></td>
                                    <td className='cell-input'><input type='date' id='birthday' name='birthday'></input></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Contact Number</td>
                                    <td className='cell-title'>Email</td>
                                    <td className='cell-title'>Home Address</td>
                                    <td className='cell-title'>Region</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'><input type='text' id='contact_number' name='contactnumber'></input></td>
                                    <td className='cell-input'><input type='text' id='email' name='email'></input></td>
                                    <td className='cell-input'><input type='text' id='home_address' name='address'></input></td>
                                    <td className='cell-input'>
                                        <select id='region' name='region'>
                                            <option>Select Region</option>
                                            <option value="region-1">Region I</option>
                                            <option value="region-2">Region II</option>
                                            <option value="region-3">Region III</option>
                                            <option value="region-4a">Region IV-A</option>
                                            <option value="region-4b">Region IV-B</option>
                                            <option value="region-5">Region V</option>
                                            <option value="region-6">Region VI</option>
                                            <option value="region-7">Region VII</option>
                                            <option value="region-8">Region VIII</option>
                                            <option value="region-9">Region IX</option>
                                            <option value="region-10">Region X</option>
                                            <option value="region-11">Region XI</option>
                                            <option value="region-12">Region XII</option>
                                            <option value="region-13">Region XIII</option>
                                            <option value="NCR">NCR</option>
                                            <option value="CAR">CAR</option>
                                            <option value="BARMM">BARMM</option>
                                        </select>
                                    </td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>College</td>
                                    <td className='cell-title'>Degree Program</td>
                                    <td className='cell-title'>Last School Attended</td>
                                    <td className='cell-title'>Classification</td>
                                    
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'>
                                        <select id='college' name='college'>
                                            <option>Select College</option>
                                            <option value="CAS">CAS</option>
                                            <option value="CAFS">CAFS</option>
                                            <option value="CEAT">CEAT</option>
                                            <option value="CVM">CVM</option>
                                            <option value="CDC">CDC</option>
                                            <option value="CHE">CHE</option>
                                            <option value="CFNR">CFNR</option>
                                            <option value="CEM">CEM</option>
                                        </select>
                                    </td>
                                    <td className='cell-input'><input type='text' id='degree_program' name='degprog'></input></td>
                                    <td className='cell-input'><input type='text' id='last_school_attended' name='last-school'></input></td>
                                    <td className='cell-input'><input type='text' id='classification' name='classification'></input></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Honors Received</td>
                                    <td className='cell-title'>Talents</td>
                                    <td className='cell-title'>Hobbies</td>
                                    <td className='cell-title'>Organizations</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'><input type='text' id='honors_received' name='honors'></input></td>
                                    <td className='cell-input'><input type='text' id='talents' name='talents'></input></td>
                                    <td className='cell-input'><input type='text' id='hobbies' name='hobbies'></input></td>
                                    <td className='cell-input'><input type='text' id='organizations' name='organizations'></input></td>
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Ailments</td>
                                    <td className='cell-title'>Medications</td>
                                    <td className='cell-title'>Scholarships</td>
                                    <td className='cell-title'>Monthly Stipend</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'><input type='text' id='ailments' name='ailments'></input></td>
                                    <td className='cell-input'><input type='text' id='medications' name='medications'></input></td>
                                    <td className='cell-input'><input type='text' id='scholarships' name='scholarships'></input></td>
                                    <td className='cell-input'><input type='text' id='monthly_stipend' name='stipend'></input></td>
                                </tr>

                            </table>
                            
                        </form>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )

}

export default StudentInfoSheetPersonal;