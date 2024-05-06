import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import '../css/Dashboard.css'
import NavBar from '../pages/NavBar';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";

const Dashboard = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth} = useStore();     // from zustand store
    const [role, setInitialRole] = useState("");
    const [userRole, setNewRole] = useState("");
    const [userDorm, setNewDorm] = useState("");

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            setInitialRole(user.role)
        }
    },[]);

    const changeRoleandDorm = (person) => {
        console.log(userRole)
        fetch(apiUrl("/user"), {
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: person.email,
                role: userRole,
                dorm: userDorm
            })
        })
        .then(response => {return response.json()})
        .then(
            setTimeout(function(){
                window.location.reload();
             }, 1000)
        )
    }

    const handleChange=()=>{
        console.log(document.getElementById("user_role").value);
        setNewRole(document.getElementById("user_role").value);
        console.log(document.getElementById("user_dorm").value);
        setNewDorm(document.getElementById("user_dorm").value);
    }
   
    return (
        <div >
            <NavBar></NavBar>
            <div className='dashboard-body'>
                <div className='dashboard-notice'>
                    
                    {user ?
                    <div>
                        <p className='greet'>Greetings, {user.first_name}!</p>
                        <br></br>
                        <p className='paragraph'>Welcome to the UPLB Dormitory Management Information System.</p>  
                    </div>
                    :
                    ""
                    }
                    <br></br>
                    { role === 'resident' && user.completed_profile === false ?
                    <div>
                    <p className='paragraph'>To access resident permissions, kindly complete your profile first.</p>
                    <br></br>
                    <button className='dashboard-buttons-complete-profile' onClick={() => navigate("/complete-resident-profile")}>COMPLETE PROFILE</button>
                    </div>
                    :
                    ""
                    }

                    { role === 'dorm manager' && user.completed_profile === false  ?
                    <div>
                        <p className='paragraph'>To access dorm manager permissions, kindly complete your profile first.</p>
                        <br></br>
                        <button className='dashboard-buttons-complete-profile' onClick={() => navigate("/complete-manager-profile")}>COMPLETE PROFILE HERE</button>
                    </div>
                    
                    :
                    ""
                    }

                    { role === 'dorm attendant' && user.completed_profile === false  ?
                    <div>
                    <p className='paragraph'>To access dorm attendant permissions, kindly complete your profile first.</p>
                    <br></br>
                    <button className='dashboard-buttons-complete-profile' onClick={() => navigate("/complete-attendant-profile")}>COMPLETE PROFILE</button>
                    </div>
                    :
                    ""
                    }
                    { role === 'dorm assistant' && user.completed_profile === true ?
                    <div>
                    <p className='paragraph'>As a dorm assistant, you have elevated resident permissions.</p>
                    </div>
                    :
                    ""
                    }
                    
                </div>

            

            { role === 'user' ?
            <div className='sign-up-board'>
                
                    <form className='complete-sign-up'>
                        <p><b>First, let's get you set up.</b></p>
                        <div className='set-up'>
                            <p>Please choose a role.</p>
                            <br></br>
                            <div>
                                <select className='dashboard-custom-select' id='user_role' value={userRole} onChange={handleChange}>
                                    <option value=""disabled defaultValue hidden>Choose Role</option>
                                    <option value='dorm manager'>Dorm Manager</option>
                                    <option value='dorm attendant'>Dorm Attendant</option>
                                    <option value='resident'>Resident</option>
                                </select>   
                            </div>
                            
                            <br></br>
                            <p>Choose your assigned dormitory.</p>
                            <br></br>
                            <div>
                            <select className='dashboard-custom-select' id="user_dorm" value={userDorm} onChange={handleChange}>
                                <option value="Women's Residence Hall">Women's Residence Hall</option>
                                <option value="Men's Residence Hall">Men's Residence Hall</option>
                                <option value="International House Residence Hall">International House Residence Hall</option>
                                <option value="VetMed Residence Hall">VetMed Residence Hall</option>
                                <option value="Makiling Residence Hall">Makiling Residence Hall</option>
                                <option value="ATI-NTC Residence Hall">ATI-NTC Residence Hall</option>
                                <option value="Forestry Residence Hall">Forestry Residence Hall</option>
                                <option value="New Forestry Residence Hall">New Forestry Residence Hall</option>
                                <option value="New Dormitory Residence Hall">New Dormitory Residence Hall</option>
                            </select>
                            </div>

                            <br></br>
                            <button className='confirm-information' onClick={()=> changeRoleandDorm(user)}>CONFIRM INFORMATION</button>
                        </div>
                        
                    </form>
                  </div>   
                    :
                    ""
            }

            </div>

        </div>
    )

    

   
}

export default Dashboard;