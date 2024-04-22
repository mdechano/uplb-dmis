import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import '../css/StudentInfoSheetEmergency.css'
import NavBar from './NavBar';

function StudentInfoSheetEmergency () {

    const navigate = useNavigate();

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
            <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <button className='save-button'>SAVE</button>
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
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-personal'><a className='info-sheet-btn'>PERSONAL</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav-emergency'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <h3>IN CASE OF EMERGENCY, PLEASE CONTACT THE FOLLOWING: </h3>
                            <br></br>
                            <table>
                                <tr>
                                    <th className='cell-title'>Name</th>
                                    <th className='cell-title'>Address</th>
                                    <th className='cell-title'>Cellphone/Telephone No.</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                </tr>
                                <tr className='table-form-tr'>
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

export default StudentInfoSheetEmergency;