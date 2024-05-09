import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import UPLBLogoText from '../images/UPLBLogoText.png'
import DDMenu from '../images/DDMenu.png'
import profilepic from '../images/userprofile.png'
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
    });

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
                        <img className="user-image" alt="profile" src={user.picture}/>
                        { role === 'resident' && user.completed_profile === true ?
                        <div className='dropdown-content'>
                            {/* <a><Link to='/student-personal'>Student Information Sheet</Link></a> */}
                            <a onClick={() => navigate('/resident-personal/'+user.profile_id)}>Student Information Sheet</a>
                            <a><Link to='/generate-soa'>Generate SOA</Link></a>
                            <a><Link to='/upload-receipt'>Upload Receipt</Link></a>
                            <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                            
                        </div>
                        : "" }
                        { role === 'dorm manager' && user.completed_profile === true  ?
                        <div className='dropdown-content'>
                            <a onClick={() => navigate('/residents-list')}>Resident List</a>
                            <a onClick={() => navigate('/manager/'+user.profile_id)}>Dorm Manager Profile</a>
                            {/* <a><Link to='/manager-profile'>Dorm Manager Profile</Link></a> */}
                            <a><Link>Dorm Assistants</Link></a>
                            <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                        </div>
                        : "" }
                        { role === 'dorm attendant' && user.completed_profile === true  ?
                        <div className='dropdown-content'>
                        <a onClick={() => navigate('/residents-list')}>Resident List</a>
                        <a onClick={() => navigate('/attendant/'+user.profile_id)}>Dorm Attendant Profile</a>
                        <a><Link>Dorm Assistants</Link></a>
                        <a onClick={() => navigate('/dorm-information')}>Dorm Information</a>
                        </div>
                        : "" }
                        { role === 'dorm assistant' && user.completed_profile === true  ?
                        <div className='dropdown-content'>
                        <a onClick={() => navigate('/residents-list')}>Resident List</a>
                        <a><Link to='/student-personal'>Student Information Sheet</Link></a>
                        <a><Link to='/generate-soa'>Generate SOA</Link></a>
                        <a><Link to='/upload-receipt'>Upload Receipt</Link></a>
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