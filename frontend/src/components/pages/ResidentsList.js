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

    let input;

    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    // const [ residents, setResidents ] =  useState();
    const [record, setRecord] = useState();
    const [viewValue, setViewValue] = useState("resident");
    const [orderValue, setOrderValue] = useState("");

    const orderFilter = [
        {label: 'NONE', value: ''},
        {label: 'LAST NAME', value: 'last_name'},
        {label: 'STUDENT NUMBER', value: 'student_number'},
        {label: 'COLLEGE', value: 'college'}
    ]

    const fetchData = () => {
        const getResidents = axios.get(apiUrl("/"+viewValue), { withCredentials: true });
        axios.all([getResidents]).then(
            axios.spread((...allData) => {
                const allResidentsData = allData[0].data
                setRecord(allResidentsData)
            })
        )
        console.log(record)
    }

    useEffect(()=>{
        if(orderValue !== '' && viewValue === 'resident'){
            fetch(apiUrl("/" + [viewValue] + "/sortby?" + [orderValue] + "=1"),{
                method: "GET",
                credentials:'include',
            })
            .then(response => {return response.json()})
            .then((data) => {
                setRecord(data)
            })
        }
        else {
            fetchData()
        }
    },[orderValue]);

    const orderChange=(e)=>{
        setOrderValue(e.target.value);
    }


    const handleUserInput = (e) => {
        input = e.target.value;
        console.log(input)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (input !== '' && viewValue === 'resident' ){
            fetch(apiUrl("/resident"+ "/search?input=" + [input]),{
                method: "GET",
                credentials:'include',
            })
            .then(response => {return response.json()})
            .then((data) => {
                setRecord(data.result)
            })
        } else {
            fetchData()
        }
    }

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
        }
    },[viewValue]);

    const DropDown =({value,options,onChange,type})=>{
        return(
            <label>
                <select value={value} onChange={onChange} className = 'record-dropdown'>
                {type === "order" ?  <option value = "" disabled hidden>ORDER BY</option> : <option value = "" disabled hidden></option>}
                {options.map((option,i)=>(
                    <option key={i} value = {option.value} className = 'record-option'> {option.label} </option>
                ))}
                </select>
            </label>
        );
    }


    return (
        <div>
            <NavBar></NavBar>
            <div className='residents-list-body-div'>
                <div className='residents-list-upper'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <h1>{user.dorm} Residents List</h1>
                    <form class="search-bar" >
                    <input type="text" placeholder="last name or first name" value = {input} onChange = {handleUserInput} required />
                    <button onClick={handleSubmit} type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <br></br>
                <div className='residents-list-middle'>
                    <p className='payment-note'><i>You are now viewing the list of residents residing in {user.dorm}. To search for a specific student, enter their <b>student number</b> or <b>last name</b> in the search bar of this page.</i></p>
                    <div className='record-dropdowns'>
                    {viewValue === 'resident' ? <DropDown className = 'record-dropdown' type="order" options={orderFilter} value = {orderValue} onChange={orderChange}/>: 
                    ""} 
                </div>
                </div>
                <br></br>
                
                <div className="scrollable-table">
                    <table className='residents-list-table'>
                        <thead>
                            <tr>
                                <th>LAST NAME</th>
                                <th>FIRST NAME</th>
                                <th>MIDDLE NAME</th>
                                <th>COLLEGE</th>
                                <th>STUDENT NUMBER</th>
                                <th>EMAIL</th>
                                <th>CONTACT NUMBER</th>
                            </tr>
                        </thead>
                        { record !== undefined ?
                            record.map((person,i) => {
                                if (person.dorm === user.dorm) {
                                    return (
                                        <tbody>
                                            <tr onClick={()=> navigate("/resident-personal/"+person._id)}>
                                                <td>{person.last_name}</td>
                                                <td>{person.first_name}</td>
                                                <td>{person.middle_name}</td>
                                                <td>{person.college}</td>
                                                <td>{person.student_no}</td>
                                                <td>{person.email}</td>
                                                <td>{person.contact_number}</td>
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