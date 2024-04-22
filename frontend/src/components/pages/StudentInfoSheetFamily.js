import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetFamily.css'
import NavBar from './NavBar';

function StudentInfoSheetFamily () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

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

        const father_details = {
            father_name: document.getElementById("fathername").value,
            father_occupation: document.getElementById("fatheroccupation").value,
            father_monthly_income: document.getElementById("fatherincome").value,
            father_employer: document.getElementById("fatheremployer").value,
            father_office: document.getElementById("fatheroffice").value,
            father_phone: document.getElementById("fatherphone").value,
        }

        const mother_details = {
            mother_name: document.getElementById("mothername").value,
            mother_occupation: document.getElementById("motheroccupation").value,
            mother_monthly_income: document.getElementById("motherincome").value,
            mother_employer: document.getElementById("motheremployer").value,
            mother_office: document.getElementById("motheroffice").value,
            mother_phone: document.getElementById("motherphone").value,
        }

        fetch(apiUrl("/resident"),{
            method: "POST",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                // parents_status: 
                father_detials: father_details,
                mother_details: mother_details,
                number_of_brothers: document.getElementById("numberbrothers").value,
                number_of_sisters: document.getElementById("numbersisters").value,
                birth_order: document.getElementById("birthorder").value,
            })
        })
        .then(response => {return response.json()})
    }

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
    },[]);

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
            <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <button >EDIT PROFILE</button>
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
                            <button className='stud-info-sheet-nav-family'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <table>
                                <h3 className='cell-title-family'>Parents' Status</h3>
                                <br></br>
                                <td></td>
                                <br></br>
                                <br></br>
                                <h3 className='cell-title-family'>Father's Information</h3>
                                <tr>
                                    <td className='cell-title'>Name</td>
                                    <td className='cell-title'>Occupation</td>
                                    <td className='cell-title'>Monthly Income</td>
                                </tr>
                                <tr>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                </tr>

                                <tr>
                                    <td className='cell-title'>Name of Firm/Employer</td>
                                    <td className='cell-title'>Office Address</td>
                                    <td className='cell-title'>Cellphone/Telephone no.</td>
                                </tr>
                                <tr>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                </tr>
                                <br></br>
                                <br></br>
                                <h3 className='cell-title-family'>Mother's Information</h3>
                                <tr>
                                    <td className='cell-title'>Name</td>
                                    <td className='cell-title'>Occupation</td>
                                    <td className='cell-title'>Monthly Income</td>
                                </tr>
                                <tr>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                </tr>

                                <tr>
                                    <td className='cell-title'>Name of Firm/Employer</td>
                                    <td className='cell-title'>Office Address</td>
                                    <td className='cell-title'>Cellphone/Telephone no.</td>
                                </tr>
                                <tr>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                    <td className='cell-input'></td>
                                </tr>
                                <br></br>
                                <br></br>
                                <h3 className='cell-title-family'>Sibling Information</h3>
                                <tr>
                                    <td className='cell-title'>Number of brother/s</td>
                                    <td className='cell-title'>Number of sister/s</td>
                                    <td className='cell-title'>Birth Order</td>
                                </tr>
                                <tr>
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

export default StudentInfoSheetFamily;