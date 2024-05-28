import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetPayment.css';
import NavBar from './NavBar';

function StudentInfoSheetPayment () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentResident, setResident] = useState();
    const [ resident_users, setResidentUsers] = useState();
    const [ resident_payments, setResidentPayments ] = useState();
    const [ hire_flag, setHireFlag ] = useState(false);
    const [ remove_flag, setRemoveFlag ] = useState(false);
    const [ delete_flag, setDeleteFlag ] = useState(false);
    const [ slas_flag, setSlasFlag ] = useState(false);
    const [ new_slas, setNewSlas ] = useState();
    const [ edit_flag, setEditFlag ] = useState(false);
    const [ edit_payment, setEditPayment] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
        const getResidentUsers = axios.get(apiUrl("/user") , { withCredentials: true });
        const getResidentPayments = axios.get(apiUrl("/payment") , { withCredentials: true });
            axios.all([getResident, getResidentUsers, getResidentPayments]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    const allResidentUserData = allData[1].data
                    const allPaymentData = allData[2].data
                    setResident(allResidentData)
                    setResidentUsers(allResidentUserData)
                    setResidentPayments(allPaymentData)
                })
            )
    }

    const editResidentRole = () => {

        fetch(apiUrl("/resident/"+currentResident._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    user_id: currentResident.user_id, 
                    dorm: currentResident.dorm,
                    role: "dorm assistant",
                    first_name: currentResident.first_name,
                    last_name: currentResident.last_name,
                    middle_name: currentResident.middle_name,
                    suffix: currentResident.suffix,
                    sex: currentResident.sex,
                    student_no: currentResident.student_no,
                    civil_status: currentResident.civil_status,
                    birthday: currentResident.birthday,
                    contact_number: currentResident.contact_number,
                    email: currentResident.email,
                    home_address: currentResident.home_address,
                    region: currentResident.region,
                    college: currentResident.college,
                    degree_program: currentResident.degree_program,
                    last_school_attended: currentResident.last_school_attended,
                    classification: currentResident.classification,
                    honors_received: currentResident.honors_received,
                    talents: currentResident.talents,
                    hobbies: currentResident.hobbies,
                    organizations: currentResident.organizations,
                    ailments: currentResident.ailments,
                    medications: currentResident.medications,
                    scholarships: currentResident.scholarships,
                    monthly_stipend: currentResident.monthly_stipend,
                    parents_status: currentResident.parents_status,
                    father_details: currentResident.father_details,
                    mother_details: currentResident.mother_details,
                    number_of_brothers: currentResident.number_of_brothers,
                    number_of_sisters: currentResident.number_of_sisters,
                    birth_order: currentResident.birth_order,
                    check_in_out_details: currentResident.check_in_out_details,
                    appliances: currentResident.appliances,
                    appliances_information: currentResident.appliances_information,
                    emergency_details: currentResident.emergency_details,
                    slas: currentResident.slas,
                    picture_url: currentResident.picture_url
            })
        })
        .then(response => {return response.json()})
        .then(editResidentUserRole)
    }

    const editResidentUserRole = () => {
        // console.log(currentResident.user_id);
        if (currentResident !== undefined) {
            if (resident_users !== undefined) {
            resident_users.map((person, i) => {
                if (currentResident.user_id === person._id) {
                    const currentPerson = person
                    console.log(currentPerson)
                    fetch(apiUrl("/user/change-resident-role/"+currentPerson._id), {
                        method: "PUT",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            email: currentPerson.email,
                            first_name: currentPerson.first_name,
                            last_name: currentPerson.last_name,
                            picture: currentPerson.picture,
                            role: "dorm assistant",
                            dorm: currentPerson.dorm,
                            completed_profile: currentPerson.completed_profile,
                            profile_id: currentPerson.profile_id
                        })
                    })
                    .then(response => {return response.json()})
                    .then(
                        alert("Successfully hired a dorm assistant."),
                        navigate("/residents-list")
                    )
                }
            })
            }   
        }
    }

    const editResidentRole1 = () => {
        fetch(apiUrl("/resident/"+currentResident._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    user_id: currentResident.user_id, 
                    dorm: currentResident.dorm,
                    role: "resident",
                    first_name: currentResident.first_name,
                    last_name: currentResident.last_name,
                    middle_name: currentResident.middle_name,
                    suffix: currentResident.suffix,
                    sex: currentResident.sex,
                    student_no: currentResident.student_no,
                    civil_status: currentResident.civil_status,
                    birthday: currentResident.birthday,
                    contact_number: currentResident.contact_number,
                    email: currentResident.email,
                    home_address: currentResident.home_address,
                    region: currentResident.region,
                    college: currentResident.college,
                    degree_program: currentResident.degree_program,
                    last_school_attended: currentResident.last_school_attended,
                    classification: currentResident.classification,
                    honors_received: currentResident.honors_received,
                    talents: currentResident.talents,
                    hobbies: currentResident.hobbies,
                    organizations: currentResident.organizations,
                    ailments: currentResident.ailments,
                    medications: currentResident.medications,
                    scholarships: currentResident.scholarships,
                    monthly_stipend: currentResident.monthly_stipend,
                    parents_status: currentResident.parents_status,
                    father_details: currentResident.father_details,
                    mother_details: currentResident.mother_details,
                    number_of_brothers: currentResident.number_of_brothers,
                    number_of_sisters: currentResident.number_of_sisters,
                    birth_order: currentResident.birth_order,
                    check_in_out_details: currentResident.check_in_out_details,
                    appliances: currentResident.appliances,
                    appliances_information: currentResident.appliances_information,
                    emergency_details: currentResident.emergency_details,
                    slas: currentResident.slas,
                    picture_url: currentResident.picture_url
            })
        })
        .then(response => {return response.json()})
        .then(editResidentUserRole1)
    }

    const editResidentUserRole1 = () => {
        // console.log(currentResident.user_id);
        if (currentResident !== undefined) {
            if (resident_users !== undefined) {
            resident_users.map((person, i) => {
                if (currentResident.user_id === person._id) {
                    const currentPerson = person
                    console.log(currentPerson)
                    fetch(apiUrl("/user/change-resident-role/"+currentPerson._id), {
                        method: "PUT",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            email: currentPerson.email,
                            first_name: currentPerson.first_name,
                            last_name: currentPerson.last_name,
                            picture: currentPerson.picture,
                            role: "resident",
                            dorm: currentPerson.dorm,
                            completed_profile: currentPerson.completed_profile,
                            profile_id: currentPerson.profile_id
                        })
                    })
                    .then(response => {return response.json()})
                    .then(
                        alert("Successfully removed a dorm assistant."),
                        navigate("/residents-list")
                    )
                }
            })
            }   
        }
    }
    
    const deleteResident = (id) => {
        fetch(apiUrl("/resident"), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ids: [`${id}`],
            }) 
        })
        .then(response => {return response.json()})
        .then(alert("Successfully deleted resident."),
        navigate("/residents-list"))
    }
    
    const handleChange=()=>{
        console.log(document.getElementById("slas_status").value);
        setNewSlas(document.getElementById("slas_status").value);
    }

    const updateResidentSLAS = (new_slas) => {
        fetch(apiUrl("/resident/"+currentResident._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    user_id: currentResident.user_id, 
                    dorm: currentResident.dorm,
                    role: currentResident.role,
                    first_name: currentResident.first_name,
                    last_name: currentResident.last_name,
                    middle_name: currentResident.middle_name,
                    suffix: currentResident.suffix,
                    sex: currentResident.sex,
                    student_no: currentResident.student_no,
                    civil_status: currentResident.civil_status,
                    birthday: currentResident.birthday,
                    contact_number: currentResident.contact_number,
                    email: currentResident.email,
                    home_address: currentResident.home_address,
                    region: currentResident.region,
                    college: currentResident.college,
                    degree_program: currentResident.degree_program,
                    last_school_attended: currentResident.last_school_attended,
                    classification: currentResident.classification,
                    honors_received: currentResident.honors_received,
                    talents: currentResident.talents,
                    hobbies: currentResident.hobbies,
                    organizations: currentResident.organizations,
                    ailments: currentResident.ailments,
                    medications: currentResident.medications,
                    scholarships: currentResident.scholarships,
                    monthly_stipend: currentResident.monthly_stipend,
                    parents_status: currentResident.parents_status,
                    father_details: currentResident.father_details,
                    mother_details: currentResident.mother_details,
                    number_of_brothers: currentResident.number_of_brothers,
                    number_of_sisters: currentResident.number_of_sisters,
                    birth_order: currentResident.birth_order,
                    check_in_out_details: currentResident.check_in_out_details,
                    appliances: currentResident.appliances,
                    appliances_information: currentResident.appliances_information,
                    emergency_details: currentResident.emergency_details,
                    slas: new_slas,
                    picture_url: currentResident.picture_url
            })
        })
        .then(response => {return response.json()})
        .then(alert("Successfully updated SLAS status of student."),
        navigate("/resident-payment/"+currentResident._id), fetchData(), setSlasFlag(false))
    }

    const submitPayment = (e) => {
        e.preventDefault();

        fetch(apiUrl("/payment"),{
            method: "POST",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                term: document.getElementById("term").value,
                period_covered: document.getElementById("period_covered").value,
                or_number: document.getElementById("or_number").value,
                dorm_fee: document.getElementById("dorm_fee").value,
                appliances_fee: document.getElementById("appliances_fee").value,
                date_paid: document.getElementById("date_paid").value,
                resident_id: currentResident._id,
                committed_by: user._id
            })
        })
        .then(response => {return response.json()})
        .then(alert("Successfully submitted payment."),
        fetchData()
        )
        .then(document.getElementById("myForm").reset())
    }

    const toggleeditPayment = (payment) => {
        setEditFlag(true)
        console.log("Edit payment: " + payment._id)
        setEditPayment(payment)
        console.log(edit_payment)
    }

    const editPayment = (payment) => {
        fetch(apiUrl("/payment/"+payment._id),{
                method: "PUT",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    term: payment.term,
                    period_covered: payment.period_covered,
                    or_number: payment.or_number,
                    dorm_fee: document.getElementById("edit_dorm_fee").value,
                    appliances_fee: document.getElementById("edit_appliances_fee").value,
                    date_paid: document.getElementById("edit_date_paid").value,
                    resident_id: payment.resident_id,
                    committed_by: user._id
                })
            })
            .then(response => {return response.json()})
            .then(alert("Successfully editted payment."), setEditFlag(false), fetchData())
    }


    const deletePayment = (id) => {
        fetch(apiUrl("/payment"), {
            method: "DELETE",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ids: [`${id}`],
            }) 
        })
        .then(response => {return response.json()})
        .then(alert("Successfully deleted payment."),
        fetchData())
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

            <div className='stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <div className='extra-space'></div>
                </div>
                <hr className='divider'></hr>
                { currentResident !== undefined ?
                <div className='body-div'>
                    <div className='profile-div-left'>
                    <img width={250} className='profile-pic' src={currentResident.picture_url}></img>
                        <br></br>
                        <p className='profile-info'>{currentResident.first_name + " " + currentResident.last_name}</p>
                        <p className='profile-info'>{currentResident.student_no}</p>
                        <p className='profile-info'><b>Resident</b></p>
                        <p className='profile-info'><i>{currentResident.dorm}</i></p>
                        <br></br>
                        <div className='profile-nav'>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-personal/'+currentResident._id)}>PERSONAL INFORMATION</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-check-in/'+currentResident._id)}>CHECK IN DETAILS</button>
                            <button className='profile-nav-btn-current' onClick={() => navigate('/resident-payment/'+currentResident._id)}>PAYMENT DETAILS</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-violation/'+currentResident._id)}>VIOLATION DETAILS</button>
                            <button className='profile-nav-btn' onClick={() => navigate('/resident-receipts/'+currentResident._id)}>UPLOADED RECEIPTS</button>
                            <br></br> 
                        { user.role === 'dorm manager' && currentResident.role === 'resident' && hire_flag === false?
                            <button className='profile-nav-btn-current' onClick = {() => setHireFlag(true)}>HIRE AS ASSISTANT</button>
                            : user.role === 'dorm manager' && currentResident.role === 'dorm assistant' ?
                            <button className='profile-nav-btn-current' onClick={() => setRemoveFlag(true)}>REMOVE AS ASSISTANT</button>
                            : ""}
                            { hire_flag === true ?
                            <div className='mini-popup'>
                                <br></br>
                                <p className='payment-note'><i>Are you sure you want to hire {currentResident.first_name}?</i></p>
                                <br></br>
                                <div>
                                    <button className='edit-violation-btn' onClick={editResidentRole}>YES</button>
                                    <button className='delete-violation-btn' onClick={() => setHireFlag(false)}>NO</button>
                                </div>
                            </div>
                            : ""}
                            { remove_flag === true ?
                            <div className='mini-popup'>
                            <br></br>
                            <p className='payment-note'><i>Are you sure you want to remove {currentResident.first_name} as dorm assistant?</i></p>
                            <br></br>
                            <div>
                                <button className='edit-violation-btn' onClick={editResidentRole1}>YES</button>
                                <button className='delete-violation-btn' onClick={() => setRemoveFlag(false)}>NO</button>
                            </div>
                            </div>
                            : ""}
                            { user.role === 'dorm manager' ?
                            <button className='profile-nav-btn-delete' onClick = {() => setDeleteFlag(true)}>DELETE RESIDENT</button>
                            : ""}
                            { delete_flag === true ?
                            <div className='mini-popup'>
                            <br></br>
                            <p className='payment-note'><i>Are you sure you want to delete {currentResident.first_name}?</i></p>
                            <br></br>
                            <div>
                                <button className='edit-violation-btn' onClick={() => deleteResident(currentResident._id)}>YES</button>
                                <button className='delete-violation-btn' onClick={() => setDeleteFlag(false)}>NO</button>
                            </div>
                            </div>
                            : ""}
                        </div>
                        <br></br>
                    </div>

                    <div className='profile-div-right'>
                        { user.role === "resident" ?
                            <p className='payment-note'><i>Your confirmed payment will appear here after verification. Only authorized personel can edit this page. Kindly contact them for concerns.</i></p>
                        :""
                        }
                            <br></br>
                            <div className='slas-div'>
                                <div>
                                    
                                    <p className='slas'>SLAS Status</p>
                                    <p className='sts-bracket'><i>{currentResident.slas}</i></p>
                                    </div>
                                <div>
                                { (user.role === "dorm manager" || user.role === "dorm attendant") && slas_flag === true ?
                                    <div className='mini-popup'>
                                    <br></br>
                                    <form>
                                        <select className='dashboard-custom-select' id='slas_status' onChange={handleChange}>
                                            {/* <option value="" disabled default>Choose SLAS</option> */}
                                            <option value='No Discount'>No Discount</option>
                                            <option value='FDS'>FDS</option>
                                            <option value='FD'>FD</option>
                                            <option value='PD80'>PD 80%</option>
                                            <option value='PD60'>PD 60%</option>
                                            <option value='PD33'>PD 33%</option>
                                            
                                        </select>   
                                    </form>
                                    <div>
                                        <button className='edit-violation-btn' onClick={() => updateResidentSLAS(new_slas)}>SUBMIT</button>
                                        <button className='delete-violation-btn' onClick={() => setSlasFlag(false)}>CANCEL</button>
                                    </div>
                                    </div>
                                :   user.role === "dorm manager" || user.role === "dorm attendant" ?
                                    <div>
                                    <button className='edit-slas-btn' onClick={() => setSlasFlag(true)}>Change SLAS</button>
                                    </div>
                                : ""}
                                </div>
                            </div>
                            <br></br>
                            <table className='table-display'>
                                <tr className='table-row-display'>
                                    <td className='cell-title-display'>Term</td>
                                    <td className='cell-title-display'>Period Covered</td>
                                    <td className='cell-title-display'>OR#</td>
                                    <td className='cell-title-display'>Dorm Fee</td>
                                    <td className='cell-title-display'>Appliance Fee</td>
                                    <td className='cell-title-display'>Date Paid</td>
                                    { user.role === "dorm manager" || user.role === 'dorm attendant' || user.role === 'dorm assistant' ?
                                        <td className='cell-title-display-violation'>Edit</td>
                                    : ""}
                                    { user.role === "dorm manager" || user.role === 'dorm attendant' || user.role === 'dorm assistant' ?
                                        <td className='cell-title-display-violation'>Delete</td>
                                    : ""}
                                </tr>
                                { resident_payments !== undefined ?
                                    resident_payments.map((payment, i) => {
                                        if (currentResident._id === payment.resident_id) {
                                            return (
                                                <tr className='table-row-display'>
                                                    <td className='cell-input-display'>{payment.term}</td>
                                                    <td className='cell-input-display'>{payment.period_covered}</td>
                                                    <td className='cell-input-display'>{payment.or_number}</td>
                                                    <td className='cell-input-display'>{payment.dorm_fee}</td>
                                                    <td className='cell-input-display'>{payment.appliances_fee}</td>
                                                    <td className='cell-input-display'>{payment.date_paid}</td>
                                                    { user.role === "dorm manager" || user.role === 'dorm attendant' || user.role === 'dorm assistant' ?
                                                        <td className='cell-input-display-violation'><button className='edit-violation-btn' onClick={() => {toggleeditPayment(payment)}}>EDIT</button></td>
                                                    : ""}
                                                    { user.role === "dorm manager" || user.role === 'dorm attendant' || user.role === 'dorm assistant' ?
                                                        <td className='cell-input-display-violation'><button className='delete-violation-btn' onClick={() => {deletePayment(payment._id)}}>DELETE</button></td>
                                                    : ""}
                                                </tr>
                                            )
                                        }
                                    })

                                : ""}
                                

                            </table>

                            { edit_flag === true?
                                <div >
                                <br></br>
                                <p className='payment-note'><i>You are about to edit a payment. You may only edit the dorm fee, appliance fee, and date paid. If you wish to edit the term, period covered, or OR#, kindly delete the payment and submit a new one.</i></p>
                                <br></br>
                                    
                                     <table className='table-display'>
                                        <tr className='table-row-display'>
                                            <td ><b>Term</b></td>
                                            <td ><b>Period Covered</b></td>
                                            <td ><b>OR#</b></td>
                                            <td ><b>Dorm Fee</b></td>
                                            <td ><b>Appliance Fee</b></td>
                                            <td ><b>Date Paid</b></td>
                                            <td ></td>
                                            <td ></td>
                                            
                                        </tr>

                                        <tr className='table-row-display-edit'>
                                        <td className='cell-input'>{edit_payment.term}</td>
                                        <td className='cell-input'>{edit_payment.period_covered}</td>
                                        <td className='cell-input'>{edit_payment.or_number}</td>
                                        <td className='cell-input'><input type="text" className='edit-input' id="edit_dorm_fee" placeholder={edit_payment.dorm_fee}></input></td>
                                        <td className='cell-input'><input type="text" className='edit-input' id="edit_appliances_fee" placeholder={edit_payment.appliances_fee}></input></td>
                                        <td className='cell-input'><input type="date" className='edit-input' id="edit_date_paid" placeholder={edit_payment.date_paid}></input></td>
                                            <td className='cell-title-display'><button className='edit-violation-btn' onClick={() => {editPayment(edit_payment)}}>SAVE</button></td>
                                            <td className='cell-title-display'><button className='delete-violation-btn' onClick={() => setEditFlag(false)}>CANCEL</button></td>
                                        </tr>  
                                    </table>   
                                </div>
                                : ""}

                            { user.role === "dorm manager" || user.role === 'dorm attendant' || user.role === 'dorm assistant' ?
                            <div className='add-violation-div'>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <form className='add-violation-form'  id="myForm">
                                    <table>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Term</td>
                                        <td className='cell-title'>Period Covered</td>
                                        <td className='cell-title'>OR#</td>
                                        <td className='cell-title'>Dorm Fee</td>
                                        <td className='cell-title'>Appliances Fee</td>
                                        <td className='cell-title'>Date Paid</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type="text" className='complete-input' id="term" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="period_covered"></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="or_number" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="dorm_fee"></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="appliances_fee" ></input></td>
                                        <td className='cell-input'><input type="date" className='complete-input' id="date_paid"></input></td>
                                        
                                    </tr>
                                    </table>
                                </form>
                                <button className='add-violation-btn' onClick={submitPayment} >SUBMIT PAYMENT</button>

                            </div>
                            : ""}
                            
                    </div>
                </div>
                : <p className='profile-note'><i>Loading profile...</i></p> }
            </div>
        </div>
    )

}

export default StudentInfoSheetPayment;