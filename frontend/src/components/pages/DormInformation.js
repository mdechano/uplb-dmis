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
                    {dorm.map((dorm, i) => {
                        return (
                            user.dorm === dorm.dorm_name ?

                            <div>
                                <div className='upper-div'>
                                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                                    { user.role === 'dorm manager' || user.role === 'dorm attendant' ? 
                                        <button className='back-button' onClick = {()=> navigate("/edit-dorm-information")}>EDIT</button>
                                        : ""
                                    }
                                </div>
                                <div className='title-bg'><p className='page-title'>DORM INFORMATION</p></div>
                                    <div className='dorm-info-content'>
                                        <h3>{dorm.dorm_name}</h3>
                                        <br></br>
                                        <table className='personel-table'>
                                            <tr>
                                                <td><b>Dorm Manager</b></td>
                                                <td>{dorm.dorm_manager_name}</td>
                                                <td><b>Dorm Attendant</b></td>
                                                <td>{dorm.dorm_attendant_name}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Email</b></td>
                                                <td>{dorm.dorm_manager_email}</td>
                                                <td><b>Email</b></td>
                                                <td>{dorm.dorm_attendant_email}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Contact Number</b></td>
                                                <td>{dorm.dorm_manager_contact_number}</td>
                                                <td><b>Contact Number</b></td>
                                                <td>{dorm.dorm_attendant_contact_number}</td>
                                            </tr>
                                            </table>
                                                <br></br>
                                                <hr></hr>
                                                <br></br>
                                            <table className="hours">
                                                <tr>
                                                    <th></th>
                                                    <th>FROM</th>
                                                    <th>TO</th>
                                                </tr>
                                                <tr>
                                                    <td>Office Hours</td> 
                                                    <td>{dorm.office_hours_start}</td>
                                                    <td>{dorm.office_hours_end}</td>
                                                </tr>
                                                <tr>
                                                    <td>Late Permit Hours</td> 
                                                    <td>{dorm.late_permit_start}</td>
                                                    <td>{dorm.late_permit_end}</td>
                                                </tr>
                                                <tr>
                                                    <td>Overnight Permit Hours</td> 
                                                    <td>{dorm.overnight_permit_start}</td>
                                                    <td>{dorm.overnight_permit_end}</td>
                                                </tr>
                                                <tr>
                                                    <td>Stayover Permit Hours</td> 
                                                <td>{dorm.stayover_permit_start}</td>
                                                </tr>
                                            </table>
                                    </div>
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