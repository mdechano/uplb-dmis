import {Link, redirect} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import '../css/NavBar.css'
import NavBar from './NavBar';
import '../css/ManagerProfile.css';

function ManagerProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentManager, setManager] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getManager = axios.get(apiUrl("/manager/") + id, { withCredentials: true });
            axios.all([getManager]).then(
                axios.spread((...allData) => {
                    setManager(allData[0].data)
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
                    <button className='back-button' onClick = {()=> navigate('/dashboard')}>BACK</button>
                    <p className='page-title'>MANAGER PROFILE</p>
                    <button className='edit-profile-button' onClick={()=> navigate('/edit-manager/'+user.profile_id)}>EDIT PROFILE</button>
                </div>

                <hr className='divider'></hr>
                { currentManager !== undefined ?
                    <div className='body-div'>
                        <div className='profile-div-left'>
                            <img width={250} className='profile-pic' src={currentManager.picture_url}></img>
                            <br></br>
                            <p className='profile-info'>{currentManager.first_name + " "  + currentManager.last_name}</p>
                            <p className='profile-info'><b>Dorm Manager</b></p>
                            <p className='profile-info'><i>{currentManager.dorm}</i></p>
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
                                        <td className='cell-input-display'>{currentManager.first_name}</td>
                                        <td className='cell-input-display'>{currentManager.middle_name}</td>
                                        <td className='cell-input-display'>{currentManager.last_name}</td>
                                        <td className='cell-input-display'>{currentManager.suffix}</td>
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-title-display'>Assigned Sex</td>
                                        <td className='cell-title-display'>Birthday</td>
                                        
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-input-display'>{currentManager.sex}</td>
                                        <td className='cell-input-display'>{currentManager.birthday}</td>
                                      </tr>  
                                    
                                    <tr className='table-row-display'>
                                        <td className='cell-title-display'>Contact Number</td>
                                        <td className='cell-title-display'>Email</td>
                                        <td className='cell-title-display'>Home Address</td>
                                        
                                    </tr>
                                    <tr className='table-row-display'>
                                        <td className='cell-input-display'>{currentManager.contact_number}</td>
                                        <td className='cell-input-display'>{currentManager.email}</td>
                                        <td className='cell-input-display'>{currentManager.home_address}</td>
                                        
                                    </tr>
                                
                        </table>
                        </div>
                        
                    </div>

                :
                <p className='profile-note'><i>Loading profile...</i></p>
                // fetchData()
                }
                
                                    
                
            </div>

        </div>
    )

}

export default ManagerProfile;