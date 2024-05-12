import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetCheckIn.css';
import NavBar from './NavBar';

function StudentInfoSheetCheckIn () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentResident, setResident] = useState();
    const [ resident_users, setResidentUsers] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
        const getResidentUsers = axios.get(apiUrl("/user") , { withCredentials: true });
            axios.all([getResident, getResidentUsers]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    const allResidentUserData = allData[1].data
                    setResident(allResidentData)
                    setResidentUsers(allResidentUserData)
                })
            )
    }

    const editResidentRole = () => {

        fetch(apiUrl("/resident/"+currentResident._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    user_id: currentResident.user_id, 
                    dorm: currentResident.dorm,
                    role: "dorm assistant",
                    first_name: currentResident.first_name,
                    last_name: currentResident.last_name,
                    middle_name: currentResident.middle_name,
                    suffix: currentResident.suffix,
                    sex: currentResident.sex,
                    student_no: currentResident.student_no,
                    civil_status: currentResident.civil_status,
                    birthday: currentResident.birthday,
                    contact_number: currentResident.contact_number,
                    email: currentResident.email,
                    home_address: currentResident.home_address,
                    region: currentResident.region,
                    college: currentResident.college,
                    degree_program: currentResident.degree_program,
                    last_school_attended: currentResident.last_school_attended,
                    classification: currentResident.classification,
                    honors_received: currentResident.honors_received,
                    talents: currentResident.talents,
                    hobbies: currentResident.hobbies,
                    organizations: currentResident.organizations,
                    ailments: currentResident.ailments,
                    medications: currentResident.medications,
                    scholarships: currentResident.scholarships,
                    monthly_stipend: currentResident.monthly_stipend,
                    parents_status: currentResident.parents_status,
                    father_details: currentResident.father_details,
                    mother_details: currentResident.mother_details,
                    number_of_brothers: currentResident.number_of_brothers,
                    number_of_sisters: currentResident.number_of_sisters,
                    birth_order: currentResident.birth_order,
                    check_in_out_details: currentResident.check_in_out_details,
                    appliances: currentResident.appliances,
                    appliances_information: currentResident.appliances_information,
                    emergency_details: currentResident.emergency_details,
                    slas: currentResident.slas,
                    picture_url: currentResident.picture_url
            })
        })
        .then(response => {return response.json()})
        .then(editResidentUserRole)
    }

    const editResidentUserRole = () => {
        // console.log(currentResident.user_id);
        if (currentResident !== undefined) {
            if (resident_users !== undefined) {
            resident_users.map((person, i) => {
                if (currentResident.user_id === person._id) {
                    const currentPerson = person
                    console.log(currentPerson)
                    fetch(apiUrl("/user/change-resident-role/"+currentPerson._id), {
                        method: "PUT",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            email: currentPerson.email,
                            first_name: currentPerson.first_name,
                            last_name: currentPerson.last_name,
                            picture: currentPerson.picture,
                            role: "dorm assistant",
                            dorm: currentPerson.dorm,
                            completed_profile: currentPerson.completed_profile,
                            profile_id: currentPerson.profile_id
                        })
                    })
                    .then(response => {return response.json()})
                    .then(
                        alert("Successfully hired a dorm assistant."),
                        navigate("/residents-list")
                    )
                }
            })
            }   
        }
    }

    const editResidentRole1 = () => {
        fetch(apiUrl("/resident/"+currentResident._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    user_id: currentResident.user_id, 
                    dorm: currentResident.dorm,
                    role: "resident",
                    first_name: currentResident.first_name,
                    last_name: currentResident.last_name,
                    middle_name: currentResident.middle_name,
                    suffix: currentResident.suffix,
                    sex: currentResident.sex,
                    student_no: currentResident.student_no,
                    civil_status: currentResident.civil_status,
                    birthday: currentResident.birthday,
                    contact_number: currentResident.contact_number,
                    email: currentResident.email,
                    home_address: currentResident.home_address,
                    region: currentResident.region,
                    college: currentResident.college,
                    degree_program: currentResident.degree_program,
                    last_school_attended: currentResident.last_school_attended,
                    classification: currentResident.classification,
                    honors_received: currentResident.honors_received,
                    talents: currentResident.talents,
                    hobbies: currentResident.hobbies,
                    organizations: currentResident.organizations,
                    ailments: currentResident.ailments,
                    medications: currentResident.medications,
                    scholarships: currentResident.scholarships,
                    monthly_stipend: currentResident.monthly_stipend,
                    parents_status: currentResident.parents_status,
                    father_details: currentResident.father_details,
                    mother_details: currentResident.mother_details,
                    number_of_brothers: currentResident.number_of_brothers,
                    number_of_sisters: currentResident.number_of_sisters,
                    birth_order: currentResident.birth_order,
                    check_in_out_details: currentResident.check_in_out_details,
                    appliances: currentResident.appliances,
                    appliances_information: currentResident.appliances_information,
                    emergency_details: currentResident.emergency_details,
                    slas: currentResident.slas,
                    picture_url: currentResident.picture_url
            })
        })
        .then(response => {return response.json()})
        .then(editResidentUserRole1)
    }

    const editResidentUserRole1 = () => {
        // console.log(currentResident.user_id);
        if (currentResident !== undefined) {
            if (resident_users !== undefined) {
            resident_users.map((person, i) => {
                if (currentResident.user_id === person._id) {
                    const currentPerson = person
                    console.log(currentPerson)
                    fetch(apiUrl("/user/change-resident-role/"+currentPerson._id), {
                        method: "PUT",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            email: currentPerson.email,
                            first_name: currentPerson.first_name,
                            last_name: currentPerson.last_name,
                            picture: currentPerson.picture,
                            role: "resident",
                            dorm: currentPerson.dorm,
                            completed_profile: currentPerson.completed_profile,
                            profile_id: currentPerson.profile_id
                        })
                    })
                    .then(response => {return response.json()})
                    .then(
                        alert("Successfully removed a dorm assistant."),
                        navigate("/residents-list")
                    )
                }
            })
            }   
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

            <div className='stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    { user.role === 'resident' || user.role === 'dorm assistant' ?
                        <button className='edit-profile-button' onClick = {()=> navigate("/edit-resident-check-in/"+user.profile_id)}>EDIT PROFILE</button>
                    : <div className='extra-space'></div>}
                </div>
                <hr className='divider'></hr>
                { currentResident !== undefined ?
                
                <div className='body-div'>
                    <div className='profile-div-left'>
                        <img width={250} className='profile-pic' src={currentResident.picture_url}></img>
                        <br></br>
                        <p className='profile-info'>{currentResident.first_name + " "  + currentResident.last_name}</p>
                        <p className='profile-info'>{currentResident.student_no}</p>
                        <p className='profile-info'><b>Resident</b></p>
                        <p className='profile-info'><i>{currentResident.dorm}</i></p>
                        <br></br>
                        <div className='profile-nav'>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-personal/'+currentResident._id)}>PERSONAL INFORMATION</button>
                            <button className='profile-nav-btn-current' onClick={() => navigate('/resident-check-in/'+currentResident._id)}>CHECK IN DETAILS</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-payment/'+currentResident._id)}>PAYMENT DETAILS</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-violation/'+currentResident._id)}>VIOLATION DETAILS</button>
                        </div>
                        { user.role === 'dorm manager' && currentResident.role === 'resident' ?
                            <button className='profile-nav-btn' onClick = {editResidentRole}>HIRE AS ASSISTANT</button>
                            : user.role === 'dorm manager' ?
                            <button className='profile-nav-btn' onClick={editResidentRole1}>REMOVE AS ASSISTANT</button>
                            : ""}
                        <br></br>
                    </div>

                    <div className='profile-div-right'>
                        <table className='table-display'>
                            
                            <h3 className='section-label'>Check In Details</h3>
                            <tr className='table-row-display'>
                                <td className='cell-title-display'>First Sem Check In Date</td>
                                <td className='cell-title-display'>First Sem Check Out Date</td>
                                <td className='cell-title-display'>First Sem Form 5</td>
                                <td className='cell-title-display'>First Sem Room Number</td>
                            </tr>
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.first_sem.checkin}</td>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.first_sem.checkout}</td>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.first_sem.form5}</td>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.first_sem.room_number}</td>
                            </tr>
                            
                            <tr className='table-row-display'>
                                <td className='cell-title-display'>Second Sem Check In Date</td>
                                <td className='cell-title-display'>Second Sem Check Out Date</td>
                                <td className='cell-title-display'>Second Sem Form 5</td>
                                <td className='cell-title-display'>Second Sem Room Number</td>
                            </tr>
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.second_sem.checkin}</td>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.second_sem.checkout}</td>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.second_sem.form5}</td>
                                <td className='cell-input-display'>{currentResident.check_in_out_details.second_sem.room_number}</td>
                            </tr>

                        </table>

                        <br></br>
                        <hr className='horizontal-line'></hr>
                        <br></br>

                        <table className='table-display'>
                            
                            <h3 className='section-label'>Appliances</h3>
                            <tr className='table-row-display'>
                                <td className='cell-title-display'>Laptop</td>
                                <td className='cell-title-display'>Gadgets</td>
                                <td className='cell-title-display'>Printer</td>
                                <td className='cell-title-display'>Rice Cooker</td>
                                <td className='cell-title-display'>Electric Fan</td>
                                <td className='cell-title-display'>Refrigerator</td>
                            </tr>
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.appliances.laptop}</td>
                                <td className='cell-input-display'>{currentResident.appliances.gadgets}</td>
                                <td className='cell-input-display'>{currentResident.appliances.printer}</td>
                                <td className='cell-input-display'>{currentResident.appliances.rice_cooker}</td>
                                <td className='cell-input-display'>{currentResident.appliances.electric_fan}</td>
                                <td className='cell-input-display'>{currentResident.appliances.refrigerator}</td>
                            </tr>
                            
                        </table>

                        <br></br>
                        <hr className='horizontal-line'></hr>
                        <br></br>

                        <table className='table-display'>
                            
                            <h3 className='section-label'>Appliances Information</h3>
                            <tr className='table-row-display'>
                                <td className='cell-title-display'>Appliance</td>
                                <td className='cell-title-display'>Date Installed 1st Sem</td>
                                <td className='cell-title-display'>Date Returned 1st Sem</td>
                                <td className='cell-title-display'>Date Installed 2nd Sem</td>
                                <td className='cell-title-display'>Date Returned 2nd Sem</td>
                            </tr>

                        { currentResident.appliances_information.appliance_1.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.appliance}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_installed_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_returned_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_installed_2nd_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_2.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_2.appliance}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_2.date_installed_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_2.date_returned_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_2.date_installed_2nd_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_2.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_3.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_3.appliance}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_3.date_installed_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_3.date_returned_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_3.date_installed_2nd_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_3.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_4.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_4.appliance}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_4.date_installed_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_4.date_returned_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_4.date_installed_2nd_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_4.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_5.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_5.appliance}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_5.date_installed_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_5.date_returned_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_5.date_installed_2nd_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_5.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_6.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_6.appliance}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_6.date_installed_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_6.date_returned_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_6.date_installed_2nd_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_6.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_7.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_7.appliance}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_7.date_installed_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_7.date_returned_1st_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_7.date_installed_2nd_sem}</td>
                                <td className='cell-input-display'>{currentResident.appliances_information.appliance_7.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        { currentResident.appliances_information.appliance_8.appliance !== "" ?
                            <tr className='table-row-display'>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_8.appliance}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_8.date_installed_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_8.date_returned_1st_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_8.date_installed_2nd_sem}</td>
                                <td className='cell-input-display-even'>{currentResident.appliances_information.appliance_8.date_returned_2nd_sem}</td>
                            </tr>
                            
                        : ""}

                        </table>


                    </div>
                    
                </div>
            : <p className='profile-note'><i>Loading profile...</i></p> }

            </div>
        </div>
    )

}

export default StudentInfoSheetCheckIn;