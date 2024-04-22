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
    

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            // fetchData()
        }
    },[]);

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <button onClick={() => navigate("/complete-resident-profile")}>COMPLETE PROFILE</button>
                    <button>EDIT PROFILE</button>
                    {/* <button className='save-button' onClick = {sendData}>SAVE</button> */}
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
                            <table>
                                <tr className='table-row'>
                                    <td className='cell-title'>First Name</td>
                                    <td className='cell-title'>Middle Name</td>
                                    <td className='cell-title'>Last Name</td>
                                    <td className='cell-title'>Suffix</td>
                                    
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Assigned Sex</td>
                                    <td className='cell-title'>Student Number</td>
                                    <td className='cell-title'>Civil Status</td>
                                    <td className='cell-title'>Birthday</td>
                                    
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Contact Number</td>
                                    <td className='cell-title'>Email</td>
                                    <td className='cell-title'>Home Address</td>
                                    <td className='cell-title'>Region</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>College</td>
                                    <td className='cell-title'>Degree Program</td>
                                    <td className='cell-title'>Last School Attended</td>
                                    <td className='cell-title'>Classification</td>
                                    
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Honors Received</td>
                                    <td className='cell-title'>Talents</td>
                                    <td className='cell-title'>Hobbies</td>
                                    <td className='cell-title'>Organizations</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Ailments</td>
                                    <td className='cell-title'>Medications</td>
                                    <td className='cell-title'>Scholarships</td>
                                    <td className='cell-title'>Monthly Stipend</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
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