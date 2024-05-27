import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import UPLBLogoText from '../images/UPLBLogoText.png'
import DMISLogo from '../images/UPLBDMISlogo.png'
import DDMenu from '../images/DDMenu.png'
import '../css/NavBar.css'

function NavBar () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [role, setRole] = useState();
 
 
    const logout = () => {
        fetch(apiUrl("/user/"), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(response => {
            return response.json()
        })
        .then(navigate("/"))
        .then(
            setTimeout(function(){
                window.location.reload();
             }, 1000)
        )
       
        
    }


    useEffect(()=> {
        if(isAuthenticated === false){
            navigate("/")
        } else {
            setRole(user.role);
        }
    },[]);

    return (
        <div>
            <header className='dashboard_header'>
                <div className='left-header'>
                    
                    <img className='uplblogo' src={UPLBLogoText} alt='logo' />
                </div>
                { user ?
                <div className='profile-div'>
                    <a className='user-name'>{user.first_name}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <div className='dropdown'>
                        <img className="user-image" alt="profile" src={DDMenu}/>
                        { role === 'resident' && user.completed_profile === true ?
                        <div className='dropdown-content'>
                            <a onClick={() => navigate('/resident-personal/'+user.profile_id)}>Student Information Sheet</a>
                            <a onClick={() => navigate('/generate-soa/'+user.profile_id)}>Generate SOA</a>
                            <a onClick={() => navigate('/upload-receipt/'+user.profile_id)}>Upload Receipt</a>
                            <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                            
                        </div>
                        : "" }
                        { role === 'dorm manager' && user.completed_profile === true  ?
                        <div className='dropdown-content'>
                            <a onClick={() => navigate('/residents-list')}>Resident List</a>
                            <a onClick={() => navigate('/manager/'+user.profile_id)}>Dorm Manager Profile</a>
                            <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                        </div>
                        : "" }
                        { role === 'dorm attendant' && user.completed_profile === true  ?
                        <div className='dropdown-content'>
                        <a onClick={() => navigate('/residents-list')}>Resident List</a>
                        <a onClick={() => navigate('/attendant/'+user.profile_id)}>Dorm Attendant Profile</a>
                        <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                        </div>
                        : "" }
                        { role === 'dorm assistant' && user.completed_profile === true  ?
                        <div className='dropdown-content'>
                        <a onClick={() => navigate('/residents-list')}>Resident List</a>
                        <a onClick={() => navigate('/resident-personal/'+user.profile_id)}>Student Information Sheet</a>
                        <a onClick={() => navigate('/generate-soa/'+user.profile_id)}>Generate SOA</a>
                        <a onClick={() => navigate('/upload-receipt/'+user.profile_id)}>Upload Receipt</a>
                        <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                        </div>
                        : "" }
                    </div>
                    <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <button className='logoutbtn' onClick={logout}>Logout</button>
                </div>
                :
                ""}
            </header>
        </div>
    )

}

export default NavBar;