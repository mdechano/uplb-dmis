import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import axios, { all } from "axios";
import {apiUrl} from '../utilities/apiUrl';
import '../css/DormInformation.css'
import NavBar from '../pages/NavBar';

function DormInformation () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [dorm, setDorm] = useState();

    const fetchData = () => {
        const getDorms = axios.get(apiUrl("/dorm"), { withCredentials: true });
        axios.all([getDorms]).then(
            axios.spread((...allData) => {
                setDorm(allData[0].data)
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
            
            { dorm !== undefined ?

                <div className='dorm-info-div'>
            
                    <div className='upper-div'>
                        <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    </div>

                    <div className='title-bg'><p className='page-title'>DORM INFORMATION</p></div>
                    
                    {dorm.map((dorm, i) => {
                        return (
                            user.dorm === dorm.dorm_name ? 
                            
                                <div className='dorm-info-content'>
                                    <h3>{dorm.dorm_name}</h3>
                                    <br></br>
                                    <table>
                                        <tr>
                                            <td><th>Dorm Manager</th></td>
                                            <td>{dorm.dorm_manager_name}</td>
                                            <td><th>Dorm Attendant</th></td>
                                            <td>{dorm.dorm_attendant_name}</td>
                                        </tr>
                                        <tr>
                                            <td><th>Email</th></td>
                                            <td>{dorm.dorm_manager_email}</td>
                                            <td><th>Email</th></td>
                                            <td>{dorm.dorm_attendant_email}</td>
                                        </tr>
                                        <tr>
                                            <td><th>Contact Number</th></td>
                                            <td>{dorm.dorm_manager_contact_number}</td>
                                            <td><th>Contact Number</th></td>
                                            <td>{dorm.dorm_attendant_contact_number}</td>
                                        </tr>

                                        <br></br>
                                    </table>
                                </div>
                            : " " )
                        }
                    )}

                    
                </div>

                : 
                " "}

                
            
        </div>
    )

}

export default DormInformation;