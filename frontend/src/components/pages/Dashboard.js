import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Dashboard.css'
import NavBar from '../pages/NavBar';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';

const Dashboard = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth} = useStore();     // from zustand store
    const [role, setInitialRole] = useState("");
    const [userRole, setNewRole] = useState("");
    // const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        }
        else {
            // cannot change to new role because of this
            setInitialRole(user.role)
        }
    },[]);

    const changeRole = (person) => {
        console.log(userRole)
        fetch(apiUrl("/user"), {
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: person.email,
                role: userRole
            })
        })
        .then(response => {return response.json()})
        .then(

            setTimeout(() => window.location.reload(), 200)
            )
    }

    const handleChange=()=>{
        console.log(document.getElementById("user_role").value);
        setNewRole(document.getElementById("user_role").value);
    }

 

   
    return (
        <div>
            <NavBar></NavBar>

            <div className='dashboard-notice'>
                {user ?
                <p className='greet'><b>Greetings, {user.first_name}!</b></p>:
                ""
                }
                
                <br></br>
                <br></br>

                { role === 'user' ?
                    <form className='complete-sign-up'>
                        <h3>Let's get you set up</h3>
                        <p>Please choose a role.</p>
                        <div className='custom-select'>
                        <select className='user-role' id='user_role' value={userRole} onChange={handleChange}>
                            <option value=""disabled defaultValue hidden>Choose Role</option>
                            <option value='dorm manager'>Dorm Manager</option>
                            <option value='resident'>Resident</option>
                        </select>   
                        </div>
                        
                        <br></br>
                        <p>Choose your assigned dormitory.</p>
                        {/* <div class="custom-select">
                        <select id="resident_hall">
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
                        </div> */}

                        <br></br>
                        <button className='complete-sign-up' onClick={()=> changeRole(user)}>Complete Sign Up</button>
                    </form>
                    :
                    ""
                }

                {

                }
                
            </div>

            {/* <p>Welcome to  UPLB DMIS.  We are pleased to welcome you to ___ Resident Hall. You are required to fill up or update the student  information sheet as mandated on or before your check in date. You may also generate your statements of account in the SOA section. Payment receipts must be uploaded in the Receipt section. Please see said sections under your profile icon.<br></br><br></br>All information are subject to viewing and checking of the dorm manager and dorm assistants.</p> */}

        </div>
    )

    

   
}

export default Dashboard;