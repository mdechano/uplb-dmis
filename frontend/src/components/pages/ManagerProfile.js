import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import UPLBLogoText from '../images/UPLBLogoText.png'
import DDMenu from '../images/DDMenu.png'
import profilepic from '../images/userprofile.png'
import '../css/NavBar.css'
import NavBar from './NavBar';
import '../css/ManagerProfile.css';

function ManagerProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    // const [role, setRole] = useState();

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            // fetchData()
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
                        <button className='complete-profile-button' onClick={() => navigate("/complete-manager-profile")}>COMPLETE PROFILE</button>
                        : ""}
                    </div>
                    
                    <p className='page-title'>MANAGER PROFILE</p>

                    <div>
                        <button className='edit-profile-button'>EDIT PROFILE</button>
                    </div>
                </div>

                <div className='body-div'>
                    <div className='manager-profile-div-left'>
                        hello left
                    </div>

                    <div className='manager-profile-div-right'>
                        hello right
                    </div>
                </div>

                
            </div>

        </div>
    )

}

export default ManagerProfile;