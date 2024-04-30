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
    const [tempManager, setTempManager] = useState();
    const [tempAttendant, setTempAttendant] = useState();
    const [tempResident, setTempResident] = useState();
    const [managerID, setManagerID] = useState();
 
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

    // const fetchData = () => {
    //     const getTempManagers = axios.get(apiUrl("/manager"), { withCredentials: true });
    //     // const getTempAttendants = axios.get(apiUrl("/attendant"), { withCredentials: true });
    //     // const getTempResidents = axios.get(apiUrl("/resident"), { withCredentials: true });
    //     axios.all([getTempManagers]).then(
    //         axios.spread((...allData) => {
    //             setTempManager(allData[0].data)
    //             // setTempAttendant(allData[1].data)
    //             // setTempResident(allData[2].data)
    //             matchUserManager(tempManager)
    //         })
    //     )
    // }

    // const matchUserManager = (manager) => {
    //     if (manager !== undefined) {
    //         manager.map((manager, i) => {
    //             if (user._id === manager.user_id) {
    //                 setManagerID(manager._id);
    //                 console.log(managerID)
    //             }
    //         })
    //     } 
    // }

    useEffect(()=> {
        if(isAuthenticated === false){
            navigate("/")
        } else {
            setRole(user.role);
            // fetchData();
        }
    });

    return (
        <div>
            <header className='dashboard_header'>
                <div className='left-header'>
                    <img className='uplblogo' src={UPLBLogoText} alt='logo' />
                    <nav>
                        <ul className="dashboard-nav_links">
                            {/* <li><a>Home</a></li> */}
                            {/* <li><a>About</a></li>
                            <li><a>Contact</a></li> */}
                        </ul>
                    </nav>
                </div>
                { user ?
                <div className='profile-div'>
                    <a className='user-name'>{user.first_name}&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <div className='dropdown'>
                        <img className="user-image" alt="profile" src={user.picture}/>
                        { role === 'resident' ?
                        <div className='dropdown-content'>
                            <a><Link to='/student-info-sheet-personal'>Student Information Sheet</Link></a>
                            <a><Link to='/generate-soa'>Generate SOA</Link></a>
                            <a><Link to='/upload-receipt'>Upload Receipt</Link></a>
                            <a><Link to='/dorm-information'>Dorm Information</Link></a>
                            
                        </div>
                        : "" }
                        { role === 'dorm manager' ?
                        <div className='dropdown-content'>
                            <a><Link>Resident List</Link></a>
                            <a><Link to='/manager-profile'>Dorm Manager Profile</Link></a>
                            {/* <a onClick={() => navigate('/'+ 'manager-profile/' + managerID)}>Dorm Manager Profile</a> */}
                            <a><Link>Dorm Assistants</Link></a>
                            <a><Link to='/dorm-information'>Dorm Information</Link></a>
                            {/* <li>Resident List</li>
                            <li onClick={navigate('/manager-profile')}>Dorm Manager Profile</li>
                            <li>Dorm Assistants</li>
                            <li>Dorm Information</li> */}
                        </div>
                        : "" }
                        { role === 'dorm attendant' ?
                        <div className='dropdown-content'>
                        <a><Link>Resident List</Link></a>
                        <a><Link to='/attendant-profile'>Dorm Attendant Profile</Link></a>
                        <a><Link>Dorm Assistants</Link></a>
                        <a><Link to='/dorm-information'>Dorm Information</Link></a>
                        </div>
                        : "" }
                        { role === 'dorm assistant' ?
                        <div className='dropdown-content'>
                        <a><Link>Resident List</Link></a>
                        <a><Link to='/student-info-sheet-personal'>Student Information Sheet</Link></a>
                        <a><Link to='/generate-soa'>Generate SOA</Link></a>
                        <a><Link to='/upload-receipt'>Upload Receipt</Link></a>
                        <a><Link to='/dorm-information'>Dorm Information</Link></a>
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