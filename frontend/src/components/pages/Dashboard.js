import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Dashboard.css'
import NavBar from '../pages/NavBar';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';

const Dashboard = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth} = useStore();     // from zustand store
    const [role, setRole] = useState();

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } else {
            setRole(user.role)
        }
    },[]);

   
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
                <p>Welcome to  UPLB DMIS.  We are pleased to welcome you to ___ Resident Hall. You are required to fill up or update the student  information sheet as mandated on or before your check in date. You may also generate your statements of account in the SOA section. Payment receipts must be uploaded in the Receipt section. Please see said sections under your profile icon.<br></br><br></br>All information are subject to viewing and checking of the dorm manager and dorm assistants.</p>
            </div>

        </div>
    )

    

   
}

export default Dashboard;