import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetViolation.css';
import NavBar from './NavBar';

function StudentInfoSheetViolation () {

    const navigate = useNavigate();

    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentResident, setResident] = useState();
    const [ resident_users, setResidentUsers] = useState();
    const [ resident_violations, setResidentViolations] = useState();
    const [ hire_flag, setHireFlag ] = useState(false);
    const [ remove_flag, setRemoveFlag ] = useState(false);
    const [ delete_flag, setDeleteFlag ] = useState(false);
    const [ edit_flag, setEditFlag ] = useState(false);
    const [ edit_violation, setEditViolation] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
        const getResidentUsers = axios.get(apiUrl("/user") , { withCredentials: true });
        const getResidentViolations = axios.get(apiUrl("/violation") , { withCredentials: true });
            axios.all([getResident, getResidentUsers, getResidentViolations]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    const allResidentUserData = allData[1].data
                    const allViolationData = allData[2].data
                    setResident(allResidentData)
                    setResidentUsers(allResidentUserData)
                    setResidentViolations(allViolationData)
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

    const submitViolation = (e) => {
        e.preventDefault();

        fetch(apiUrl("/violation"),{
            method: "POST",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                date: document.getElementById("violation_date").value,
                time: document.getElementById("violation_time").value,
                nature: document.getElementById("violation_nature").value,
                remarks: document.getElementById("violation_remarks").value,
                resident_id: currentResident._id,
                committed_by: user._id
            })
        })
        .then(response => {return response.json()})
        .then(alert("Successfully submitted violation."),
        fetchData())
        .then(document.getElementById("myForm").reset())
    }

    const toggleeditViolation = (violation) => {
        setEditFlag(true)
        console.log("Edit violation: " + violation._id)
        setEditViolation(violation)
        console.log(edit_violation)
    }

    const editViolation = (violation) => {
        fetch(apiUrl("/violation/"+violation._id),{
                method: "PUT",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    date: violation.date,
                    time: violation.time,
                    nature: document.getElementById("edit_violation_nature").value,
                    remarks: document.getElementById("edit_violation_remarks").value,
                    resident_id: violation.resident_id,
                    committed_by: user._id
                })
            })
            .then(response => {return response.json()})
            .then(alert("Successfully editted violation."), setEditFlag(false), fetchData())
    }

    const deleteViolation = (id) => {
        fetch(apiUrl("/violation"), {
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
        .then(alert("Successfully deleted violation."), fetchData())
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
                <div>
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
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-payment/'+currentResident._id)}>PAYMENT DETAILS</button>
                            <button className='profile-nav-btn-current' onClick={() => navigate('/resident-violation/'+currentResident._id)}>VIOLATION DETAILS</button>
                        
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
                        
                            <p className='payment-note'><i>Your recorded violations will appear here. Only authorized personel can edit this page. Kindly contact them for concerns.</i></p>
                            <br></br>
                            
                            <table className='table-display'>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Date</td>
                                    <td className='cell-title-display'>Time</td>
                                    <td className='cell-title-display'>Nature</td>
                                    <td className='cell-title-display'>Remarks</td>
                                    { user.role === "dorm manager" || user.role === 'dorm attendant' ?
                                        <td className='cell-title-display-violation'>Edit</td>
                                    : ""}
                                    { user.role === "dorm manager" || user.role === 'dorm attendant' ?
                                        <td className='cell-title-display-violation'>Delete</td>
                                    : ""}
                                </tr>
                                { resident_violations !== undefined ?
                                    resident_violations.map((violation, i) => {
                                        if (currentResident._id === violation.resident_id) {
                                            // console.log(i)
                                            return (
                                                <tr key={i} className='table-row-display'>
                                                    <td className='cell-input-display'>{violation.date}</td>
                                                    <td className='cell-input-display'>{violation.time}</td>
                                                    <td className='cell-input-display'>{violation.nature}</td>
                                                    <td className='cell-input-display'>{violation.remarks}</td>
                                                    { user.role === "dorm manager" || user.role === 'dorm attendant' ?
                                                        <td className='cell-input-display-violation'><button className='edit-violation-btn' onClick={() => {toggleeditViolation(violation)}}>EDIT</button></td>
                                                    : ""}
                                                    { user.role === "dorm manager" || user.role === 'dorm attendant' ?
                                                        <td className='cell-input-display-violation'><button className='delete-violation-btn' onClick={() => deleteViolation(violation._id)}>DELETE</button></td>
                                                    : ""}
                                                </tr>
                                            )
                                        }
                                        
                                    })

                                : ""}
                            </table>
                            
                            { edit_flag === true?
                                <div >
                                <br></br>
                                <p className='payment-note'><i>You are about to edit a violation. You may only edit the nature and remarks of the violation. If you wish to edit the date and time, kindly delete the violation and submit a new one.</i></p>
                                <br></br>
                                    
                                     <table className='table-display'>
                                        <tr className='table-row-display'>
                                            <td ><b>Date</b></td>
                                            <td ><b>Time</b></td>
                                            <td ><b>Nature</b></td>
                                            <td ><b>Remarks</b></td>
                                            <td ></td>
                                            <td ></td>
                                            
                                        </tr>
                                        <tr className='table-row-display-edit'>
                                            <td className='cell-input'>{edit_violation.date}</td>
                                            <td className='cell-input'>{edit_violation.time}</td>
                                            <td className='cell-input'><input type="text" className='complete-input' id="edit_violation_nature" placeholder={edit_violation.nature}></input></td>
                                            <td className='cell-input'><input type="text" className='complete-input' id="edit_violation_remarks" placeholder={edit_violation.remarks}></input></td>
                                            <td className='cell-title-display'><button className='edit-violation-btn' onClick={() => {editViolation(edit_violation)}}>SAVE</button></td>
                                            <td className='cell-title-display'><button className='delete-violation-btn' onClick={() => setEditFlag(false)}>CANCEL</button></td>
                                        </tr>  
                                    </table>   
                                </div>
                                : ""}

                            { user.role === "dorm manager" || user.role === 'dorm attendant' ?
                            <div className='add-violation-div'>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <form className='add-violation-form' id="myForm">
                                    <table>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Date</td>
                                        <td className='cell-title'>Time</td>
                                        <td className='cell-title'>Nature</td>
                                        <td className='cell-title'>Remarks</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type="date" className='complete-input' id="violation_date"></input></td>
                                        <td className='cell-input'><input type="time" className='complete-input' id="violation_time" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="violation_nature" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="violation_remarks" ></input></td>
                                        
                                    </tr>
                                    </table>
                                </form>
                                <button className='add-violation-btn' onClick={submitViolation}>SUBMIT VIOLATION</button>

                            </div>
                            : ""}
                    </div>
                </div>
                : <p className='profile-note'><i>Loading profile...</i></p> }
                </div>
               
            </div>
        </div>
    )

}

export default StudentInfoSheetViolation;