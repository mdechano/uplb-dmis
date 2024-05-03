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

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
            axios.all([getResident]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    setResident(allResidentData)
                    var picture_id = allData[0].data.picture_id.split(".")[0]
                    fetch(apiUrl("/picture/" + picture_id), {
                        method: "GET",
                    }).then((response) => response.json())
                })
            )
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
                    <button className='save-button'>SAVE</button>
                </div>

                { currentResident !== undefined ?
                <div className='body-div'>
                    <div className='profile-div-left'>
                        <img className='profile-pic' src={require(`../pictures/${currentResident.picture_id}`)}></img>
                        <br></br>
                        <p className='profile-info'>{currentResident.first_name + " " + currentResident.last_name}</p>
                        <p className='profile-info'><b>Resident</b></p>
                        <p className='profile-info'><i>{currentResident.dorm}</i></p>
                        <br></br>
                        <div className='profile-nav'>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-personal/'+currentResident._id)}>PERSONAL INFORMATION</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-check-in/'+currentResident._id)}>CHECK IN DETAILS</button>
                            <button className='profile-nav-btn-current' onClick={() => navigate('/resident-payment/'+currentResident._id)}>PAYMENT DETAILS</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-violation/'+currentResident._id)}>VIOLATION DETAILS</button>
                        </div>
                    </div>

                    <div className='profile-div-right'>
                        
                            <p className='payment-note'>Your confirmed payment will appear here after verification. Only authorized personal can edit this page.</p>
                            <br></br>
                            <p className='slas'>SLAS Status</p>
                            <p className='sts-bracket'>{currentResident.slas}</p>
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
                                
                            </table>
                            
                    </div>
                </div>
                : "" }
            </div>
        </div>
    )

}

export default StudentInfoSheetPayment;