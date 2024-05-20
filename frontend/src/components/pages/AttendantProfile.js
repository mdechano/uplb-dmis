import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import '../css/NavBar.css'
import NavBar from './NavBar';
import '../css/ManagerProfile.css';

function AttendantProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentAttendant, setAttendant] = useState();
    const [allPicture, setAllPictures] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getAttendant = axios.get(apiUrl("/attendant/") + id, { withCredentials: true });
        axios.all([getAttendant]).then(
            axios.spread((...allData) => {
                setAttendant(allData[0].data)
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

            <div className='manager-profile-div'>

                <div className='upper-div'>
                    <div>
                        <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                        { user.completed_profile === false ?
                        <button className='complete-profile-button' onClick={() => navigate("/complete-attendant-profile")}>COMPLETE PROFILE</button>
                        : ""}
                    </div>
                    
                    <p className='page-title'>ATTENDANT PROFILE</p>
                    
                    <div>
                        <button className='edit-profile-button' onClick = {()=> navigate("/edit-attendant/"+user.profile_id)}>EDIT PROFILE</button>
                    </div>
                </div>
                <hr className='divider'></hr>

                { currentAttendant !== undefined ?
                    <div className='body-div'>
                        <div className='profile-div-left'>
                            <img width={250} className='profile-pic' src={currentAttendant.picture_url}></img>
                            <br></br>
                            <p className='profile-info'>{currentAttendant.first_name + " "  + currentAttendant.last_name}</p>
                            <p className='profile-info'><b>Dorm Attendant</b></p>
                            <p className='profile-info'><i>{currentAttendant.dorm}</i></p>
                        </div>

                        <div className='profile-div-right'>
                        <table className='table-display'>
                                    <tr className='table-row-display'>
                                        <td className='cell-title-display'>First Name</td>
                                        <td className='cell-title-display'>Middle Name</td>
                                        <td className='cell-title-display'>Last Name</td>

                                        <td className='cell-title-display'>Suffix</td>
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-input-display'>{currentAttendant.first_name}</td>
                                        <td className='cell-input-display'>{currentAttendant.middle_name}</td>
                                        <td className='cell-input-display'>{currentAttendant.last_name}</td>
                                        <td className='cell-input-display'>{currentAttendant.suffix}</td>
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-title-display'>Assigned Sex</td>
                                        <td className='cell-title-display'>Birthday</td>
                                        
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-input-display'>{currentAttendant.sex}</td>
                                        <td className='cell-input-display'>{currentAttendant.birthday}</td>
                                      </tr>  
                                    
                                    <tr className='table-row-display'>
                                        <td className='cell-title-display'>Contact Number</td>
                                        <td className='cell-title-display'>Email</td>
                                        <td className='cell-title-display'>Home Address</td>
                                        
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-input-display'>{currentAttendant.contact_number}</td>
                                        <td className='cell-input-display'>{currentAttendant.email}</td>
                                        <td className='cell-input-display'>{currentAttendant.home_address}</td>
                                        
                                    </tr>
                                
                        </table>
                        </div>
                        
                    </div>

                :

                <p className='profile-note'><i>Loading profile...</i></p>
                }

                
            </div>

        </div>
    )

}

export default AttendantProfile;