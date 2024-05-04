import {Link} from 'react-router-dom'
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
    const [ currentUser, setUser] = useState();
    const [tempManager, setTempManager] = useState();
    const [ currentManager, setManager] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getManager = axios.get(apiUrl("/manager/") + id, { withCredentials: true });
            axios.all([getManager]).then(
                axios.spread((...allData) => {
                    const allManagerData = allData[0].data
                    setManager(allManagerData)
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

            <div className='manager-profile-div'>

                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate('/dashboard')}>BACK</button>
                    <p className='page-title'>MANAGER PROFILE</p>
                    <button className='edit-profile-button' onClick={()=> navigate('/edit-manager')}>EDIT PROFILE</button>
                </div>

                
                { currentManager !== undefined ?
                    <div className='body-div'>
                        <div className='profile-div-left'>
                            <img className='profile-pic' src={require(`../pictures/${currentManager.picture_id}`)}></img>
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
                ""
                // fetchData()
                }
                
                                    
                
            </div>

        </div>
    )

}

export default ManagerProfile;