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
        .then(deleteUser(currentResident.user_id))
        
    }

    const deleteUser = (id) => {
        console.log("user to delete: "+id)
        fetch(apiUrl("/user/delete-user"), {
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
        navigate("/residents-list"))
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
                        <button className='edit-profile-button' onClick = {()=> navigate("/edit-resident-personal/"+user.profile_id)}>EDIT PROFILE</button>
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
                                <button className='profile-nav-btn-current' onClick={() => navigate('/resident-personal/'+currentResident._id)}>PERSONAL INFORMATION</button>
                                <button className='profile-nav-btn' onClick={() => navigate('/resident-check-in/'+currentResident._id)}>CHECK IN DETAILS</button>
                                <button className='profile-nav-btn' onClick={() => navigate('/resident-payment/'+currentResident._id)}>PAYMENT DETAILS</button>
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
                            <table className='table-display'>
                                <h3 className='section-label'>Personal Information</h3>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>First Name</td>
                                    <td className='cell-title-display'>Middle Name</td>
                                    <td className='cell-title-display'>Last Name</td>
                                    <td className='cell-title-display'>Suffix</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.first_name}</td>
                                    <td className='cell-input-display'>{currentResident.middle_name}</td>
                                    <td className='cell-input-display'>{currentResident.last_name}</td>
                                    <td className='cell-input-display'>{currentResident.suffix}</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Assigned Sex</td>
                                    <td className='cell-title-display'>Birthday</td>
                                    <td className='cell-title-display'>Contact Number</td>
                                    <td className='cell-title-display'>Email</td>
                                    
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.sex}</td>
                                    <td className='cell-input-display'>{currentResident.birthday}</td>
                                    <td className='cell-input-display'>{currentResident.contact_number}</td>
                                    <td className='cell-input-display'>{currentResident.email}</td>
                                </tr>  
                                
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Home Address</td>
                                    <td className='cell-title-display'>Region</td>
                                    <td className='cell-title-display'>College</td>
                                    <td className='cell-title-display'>Degree Program</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.home_address}</td>
                                    <td className='cell-input-display'>{currentResident.region}</td>
                                    <td className='cell-input-display'>{currentResident.college}</td>
                                    <td className='cell-input-display'>{currentResident.degree_program}</td>
                                </tr>

                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Last School Attended</td>
                                    <td className='cell-title-display'>Classification</td>
                                    <td className='cell-title-display'>Honors Received</td>
                                    <td className='cell-title-display'>Talents</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.last_school_attended}</td>
                                    <td className='cell-input-display'>{currentResident.classification}</td>
                                    <td className='cell-input-display'>{currentResident.honors_received}</td>
                                    <td className='cell-input-display'>{currentResident.talents}</td>
                                </tr>

                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Hobbies</td>
                                    <td className='cell-title-display'>Organizations</td>
                                    <td className='cell-title-display'>Ailments</td>
                                    <td className='cell-title-display'>Medications</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.hobbies}</td>
                                    <td className='cell-input-display'>{currentResident.organizations}</td>
                                    <td className='cell-input-display'>{currentResident.ailments}</td>
                                    <td className='cell-input-display'>{currentResident.medications}</td>
                                </tr>

                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Scholarships</td>
                                    <td className='cell-title-display'>Monthly Stipend</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.scholarships}</td>
                                    <td className='cell-input-display'>{currentResident.monthly_stipend}</td>
                                </tr>
                            
                            </table>

                            <br></br>
                            <hr className='horizontal-line'></hr>
                            <br></br>

                            <table className='table-display'>
                                <h3 className='section-label'>Family Information</h3>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Parents' Status</td>
                                    <td className='cell-title-display'>Number of Brothers</td>
                                    <td className='cell-title-display'>Number of Sisters</td>
                                    <td className='cell-title-display'>Birth Order</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.parents_status}</td>
                                    <td className='cell-input-display'>{currentResident.number_of_brothers}</td>
                                    <td className='cell-input-display'>{currentResident.number_of_sisters}</td>
                                    <td className='cell-input-display'>{currentResident.birth_order}</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Father's Name</td>
                                    <td className='cell-title-display'>Father's Occupation</td>
                                    <td className='cell-title-display'>Father's Monthly Income</td>
                                    <td className='cell-title-display'>Name of Firm/Employer</td>
                                    
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.father_details.father_name}</td>
                                    <td className='cell-input-display'>{currentResident.father_details.father_occupation}</td>
                                    <td className='cell-input-display'>{currentResident.father_details.father_monthly_income}</td>
                                    <td className='cell-input-display'>{currentResident.father_details.father_employer}</td>
                                </tr>  
                                
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Office Address</td>
                                    <td className='cell-title-display'>Father's Phone Number</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.father_details.father_office}</td>
                                    <td className='cell-input-display'>{currentResident.father_details.father_phone}</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Mother's Name</td>
                                    <td className='cell-title-display'>Mother's Occupation</td>
                                    <td className='cell-title-display'>Mother's Monthly Income</td>
                                    <td className='cell-title-display'>Name of Firm/Employer</td>
                                    
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.mother_details.mother_name}</td>
                                    <td className='cell-input-display'>{currentResident.mother_details.mother_occupation}</td>
                                    <td className='cell-input-display'>{currentResident.mother_details.mother_monthly_income}</td>
                                    <td className='cell-input-display'>{currentResident.mother_details.mother_employer}</td>
                                </tr>  
                                
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Office Address</td>
                                    <td className='cell-title-display'>Mother's Phone Number</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.mother_details.mother_office}</td>
                                    <td className='cell-input-display'>{currentResident.mother_details.mother_phone}</td>
                                </tr>
                            
                            </table>

                            <br></br>
                            <hr className='horizontal-line'></hr>
                            <br></br>

                            <table className='table-display'>
                                <h3 className='section-label'>Emergency Details</h3>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Name</td>
                                    <td className='cell-title-display'>Address</td>
                                    <td className='cell-title-display'>Contact Number</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.emergency_details.emergency_contact_1.name}</td>
                                    <td className='cell-input-display'>{currentResident.emergency_details.emergency_contact_1.address}</td>
                                    <td className='cell-input-display'>{currentResident.emergency_details.emergency_contact_1.phone}</td>
                                </tr>
                                
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Name</td>
                                    <td className='cell-title-display'>Address</td>
                                    <td className='cell-title-display'>Contact Number</td>
                                </tr>
                                <tr className='table-row-display'>
                                    <td className='cell-input-display'>{currentResident.emergency_details.emergency_contact_2.name}</td>
                                    <td className='cell-input-display'>{currentResident.emergency_details.emergency_contact_2.address}</td>
                                    <td className='cell-input-display'>{currentResident.emergency_details.emergency_contact_2.phone}</td>
                                </tr>
                            
                            </table>
                            
                        </div>
                        
                    </div>
                : <p className='profile-note'><i>Loading profile...</i></p> }
                
            </div>
        </div>
    )

}

export default StudentInfoSheetPersonal;