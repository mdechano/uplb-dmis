import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetPayment.css';
import NavBar from './NavBar';

function StudentInfoSheetPayment () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentResident, setResident] = useState();
    const [ resident_users, setResidentUsers] = useState();
    const [ hire_flag, setHireFlag ] = useState(false);
    const [ remove_flag, setRemoveFlag ] = useState(false);
    const [ delete_flag, setDeleteFlag ] = useState(false);

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
    
    const deleteResident = (id) => {
        fetch(apiUrl("/resident"), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ids: [`${id}`],
            }) 
        })
        .then(response => {return response.json()})
        .then(alert("Successfully deleted resident."),
        setTimeout(function(){
            window.location.reload();
        }, 1000))
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
                    <div className='extra-space'></div>
                </div>
                <hr className='divider'></hr>
                { currentResident !== undefined ?
                <div className='body-div'>
                    <div className='profile-div-left'>
                    <img width={250} className='profile-pic' src={currentResident.picture_url}></img>
                        <br></br>
                        <p className='profile-info'>{currentResident.first_name + " " + currentResident.last_name}</p>
                        <p className='profile-info'>{currentResident.student_no}</p>
                        <p className='profile-info'><b>Resident</b></p>
                        <p className='profile-info'><i>{currentResident.dorm}</i></p>
                        <br></br>
                        <div className='profile-nav'>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-personal/'+currentResident._id)}>PERSONAL INFORMATION</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-check-in/'+currentResident._id)}>CHECK IN DETAILS</button>
                            <button className='profile-nav-btn-current' onClick={() => navigate('/resident-payment/'+currentResident._id)}>PAYMENT DETAILS</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-violation/'+currentResident._id)}>VIOLATION DETAILS</button>
                            <br></br>
                        { user.role === 'dorm manager' && currentResident.role === 'resident' && hire_flag === false?
                            <button className='profile-nav-btn-current' onClick = {() => setHireFlag(true)}>HIRE AS ASSISTANT</button>
                            : user.role === 'dorm manager' && currentResident.role === 'dorm assistant' ?
                            <button className='profile-nav-btn-current' onClick={() => setRemoveFlag(true)}>REMOVE AS ASSISTANT</button>
                            : ""}
                            { hire_flag === true ?
                            <div className='mini-popup'>
                                <br></br>
                                <p className='payment-note'><i>Are you sure you want to hire {currentResident.first_name}?</i></p>
                                <br></br>
                                <div>
                                    <button className='edit-violation-btn' onClick={editResidentRole}>YES</button>
                                    <button className='delete-violation-btn' onClick={() => setHireFlag(false)}>NO</button>
                                </div>
                            </div>
                            : ""}
                            { remove_flag === true ?
                            <div className='mini-popup'>
                            <br></br>
                            <p className='payment-note'><i>Are you sure you want to remove {currentResident.first_name} as dorm assistant?</i></p>
                            <br></br>
                            <div>
                                <button className='edit-violation-btn' onClick={editResidentRole1}>YES</button>
                                <button className='delete-violation-btn' onClick={() => setRemoveFlag(false)}>NO</button>
                            </div>
                            </div>
                            : ""}
                            { user.role === 'dorm manager' ?
                            <button className='profile-nav-btn-delete' onClick = {() => setDeleteFlag(true)}>DELETE RESIDENT</button>
                            : ""}
                            { delete_flag === true ?
                            <div className='mini-popup'>
                            <br></br>
                            <p className='payment-note'><i>Are you sure you want to delete {currentResident.first_name}?</i></p>
                            <br></br>
                            <div>
                                <button className='edit-violation-btn' onClick={() => deleteResident(currentResident._id)}>YES</button>
                                <button className='delete-violation-btn' onClick={() => setDeleteFlag(false)}>NO</button>
                            </div>
                            </div>
                            : ""}
                        </div>
                        <br></br>
                    </div>

                    <div className='profile-div-right'>
                        
                            <p className='payment-note'><i>Your confirmed payment will appear here after verification. Only authorized personel can edit this page. Kindly contact them for concerns.</i></p>
                            <br></br>
                            <p className='slas'>SLAS Status</p>
                            <p className='sts-bracket'><i>{currentResident.slas}</i></p>
                            <br></br>
                            <table className='table-display'>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Term</td>
                                    <td className='cell-title-display'>Period Covered</td>
                                    <td className='cell-title-display'>OR#</td>
                                    <td className='cell-title-display'>Dorm Fee</td>
                                    <td className='cell-title-display'>Appliances</td>
                                    <td className='cell-title-display'>Date Paid</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{}</td>
                                    <td className='cell-input-display'>{}</td>
                                    <td className='cell-input-display'>{}</td>
                                    <td className='cell-input-display'>{}</td>
                                    <td className='cell-input-display'>{}</td>
                                    <td className='cell-input-display'>{}</td>
                                </tr>

                                {/* implement this*/}
                                {/* { currentResident.appliances_information.appliance_1.appliance !== "" ?
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.appliance}</td>
                                    <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_installed_1st_sem}</td>
                                    <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_returned_1st_sem}</td>
                                    <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_installed_2nd_sem}</td>
                                    <td className='cell-input-display'>{currentResident.appliances_information.appliance_1.date_returned_2nd_sem}</td>
                                </tr>
                            
                                : ""} */}
                                
                            </table>
                            
                    </div>
                </div>
                : <p className='profile-note'><i>Loading profile...</i></p> }
            </div>
        </div>
    )

}

export default StudentInfoSheetPayment;