import {Link, redirect} from 'react-router-dom';
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import '../css/NavBar.css';
import NavBar from './NavBar';
import'../css/ResidentsList.css';

function ResidentsList () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ residents, setResidents ] =  useState([]);

    const fetchData = () => {
        const getResidents = axios.get(apiUrl("/resident"), { withCredentials: true });
        axios.all([getResidents]).then(
            axios.spread((...allData) => {
                const allResidentsData = allData[0].data
                setResidents(allResidentsData)
            })
        )
        console.log(residents)
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
            <div>
                <div className="scrollable-table">
                    <table className='blue'>
                        <thead>
                            <tr>
                                <th>LAST NAME</th>
                                <th>FIRST NAME</th>
                                <th>MIDDLE NAME</th>
                                <th>STUDENT NUMBER</th>
                                <th>EMAIL</th>
                                <th>COLLEGE</th>
                            </tr>
                        </thead>
                        { residents !== undefined ?
                            residents.map((person,i) => {
                                if (person.dorm === user.dorm) {
                                    return (
                                        <tbody>
                                            <tr onClick={()=> navigate("/resident-personal/"+person._id)}>
                                                <td>{person.last_name}</td>
                                                <td>{person.first_name}</td>
                                                <td>{person.middle_name}</td>
                                                <td>{person.student_no}</td>
                                                <td>{person.email}</td>
                                                <td>{person.college}</td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                             })
                        : ""}
                    </table>
                </div>
            </div>
        </div>
    )

} 

export default ResidentsList;