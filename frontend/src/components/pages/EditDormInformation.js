import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import axios, { all } from "axios";
import {apiUrl} from '../utilities/apiUrl';
import '../css/EditDormInformation.css'
import NavBar from '../pages/NavBar';

function EditDormInformation () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [dorm, setDorm] = useState();

    const fetchData = () => {
        // const getDorm = axios.get(apiUrl("/dorm"), { withCredentials: true });
        // const getAttendant = axios.get(apiUrl("/attendant"), { withCredentials: true });
        // axios.all([getDorm, getAttendant]).then(
        //     axios.spread((...allData) => {
        //         const allDormData = allData[0].data
        //         const allAttendantData = allData[1].data
        //         setDorm(allDormData)
        //         editDormInfo(allAttendantData)
        //     })
        // )
        const getDorm = axios.get(apiUrl("/dorm"), { withCredentials: true });
        axios.all([getDorm]).then(
            axios.spread((...allData) => {
                const allDormData = allData[0].data
                setDorm(allDormData)
                // editDorm(user)
            })
        )
    }

    const editDorm = () => {
        if (dorm !== undefined) {
            dorm.map((dorm, i) => {
                if (user.dorm === dorm.dorm_name) {
                    const currentUser = user;
                    const currentDorm = dorm;

                    console.log(currentUser);
                    console.log(currentDorm);

                    fetch(apiUrl("/dorm/"+currentDorm._id),{
                        method: "PUT",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            dorm_name: currentDorm.dorm_name,
                            dorm_details: currentDorm.dorm_details,
                            dorm_manager_id: currentDorm.dorm_manager_id,
                            dorm_manager_name: currentDorm.dorm_manager_name,
                            dorm_manager_email: currentDorm.dorm_manager_email,
                            dorm_manager_contact_number: currentDorm.dorm_manager_contact_number,
                            office_hours_start: document.getElementById("office_hours_start").value,
                            office_hours_end: document.getElementById("office_hours_end").value,
                            late_permit_start: document.getElementById("late_permit_start").value,
                            late_permit_end: document.getElementById("late_permit_end").value,
                            overnight_permit_start: document.getElementById("overnight_permit_start").value,
                            overnight_permit_end: document.getElementById("overnight_permit_end").value,
                            stayover_permit_start: document.getElementById("stayover_permit_start").value,
                            dorm_attendant_id: currentDorm.dorm_attendant_id,
                            dorm_attendant_name: currentDorm.dorm_attendant_name,
                            dorm_attendant_email: currentDorm.dorm_attendant_email,
                            dorm_attendant_contact_number: currentDorm.dorm_attendant_contact_number
                        })
                    })
                    .then(response => {return response.json()})
                    .then(
                        alert("Successfully editted dorm information."),
                        setTimeout(function(){
                            window.location.reload();
                        }, 1000))
                }
            })
        }
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
                                    <button className='back-button' onClick={editDorm}>SAVE</button>
                                    
                                </div>
                                <div className='title-bg'><p className='page-title'>EDIT DORM INFORMATION</p></div>
                                    <div className='dorm-info-content'>
                                        <h3>{dorm.dorm_name}</h3>
                                        <br></br>
                                        <p>To edit personel information, please proceed to your profile.</p>
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
                                                    <td><input type='time' id='office_hours_start'></input></td>
                                                    <td><input type='time' id='office_hours_end'></input></td>
                                                </tr>
                                                <tr>
                                                    <td>Late Permit Hours</td> 
                                                    <td><input type='time' id='late_permit_start'></input></td>
                                                    <td><input type='time' id='late_permit_end'></input></td>
                                                </tr>
                                                <tr>
                                                    <td>Overnight Permit Hours</td> 
                                                    <td><input type='time' id='overnight_permit_start'></input></td>
                                                    <td><input type='time' id='overnight_permit_end'></input></td>
                                                </tr>
                                                <tr>
                                                    <td>Stayover Permit Hours</td> 
                                                    <td><input type='time' id='stayover_permit_start'></input></td>
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

export default EditDormInformation;