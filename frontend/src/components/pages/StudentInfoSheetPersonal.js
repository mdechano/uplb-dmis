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
    const [allPicture, setAllPictures] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
            axios.all([getResident]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    setResident(allResidentData)
                })
            )
    }

    const renderImage = () => {
        fetch(apiUrl("/picture"),{
            method: "GET",
        })
        .then(response => {return response.json()})
        .then((data) => {
            console.log(data)
            setAllPictures(data)
        })
    }
    

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
            renderImage()
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
                    : user.role === 'dorm manager' ?
                        <button className='hire-button' onClick = {()=> navigate()}>HIRE AS ASSISTANT</button>
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
                            </div>
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