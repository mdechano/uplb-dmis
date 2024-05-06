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
                    <button className='edit-profile-button'>EDIT PROFILE</button>
                </div>
                
                { currentResident !== undefined ?
                
                <div className='body-div'>
                    <div className='profile-div-left'>
                        {allPicture !== undefined ?
                            allPicture.map(data => {
                                if (currentResident.base64_string === data.base64_string) {
                                    return(
                                    <img width={250} src={data.base64_string}></img>
                                    )
                                }
                        }) : ""}
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
            : "" }

            </div>
        </div>
    )

}

export default StudentInfoSheetCheckIn;