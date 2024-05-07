import {React, useEffect, useState} from 'react';
import {Link, UNSAFE_DataRouterContext, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios, { all } from "axios";
import '../css/CompleteAttendantProfile.css';
import NavBar from './NavBar';

function CompleteAttendantProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [picture, setPicture] = useState();
    const [dorm, setDorm] = useState();

    let allEmails = []
 
    const fetchData = () => {
        const getAttendants = axios.get(apiUrl("/attendant"), { withCredentials: true });
        const getDorm = axios.get(apiUrl("/dorm"), { withCredentials: true });
        axios.all([getAttendants, getDorm]).then(
            axios.spread((...allData) => {
                for (let i = 0; i < allData[0].data.length; i++) {
                    allEmails.push(allData[0].data[i].email)
                }
                const allDormData = allData[1].data
                setDorm(allDormData)
            })
        )
        console.log(allEmails);
    }

    const checkEmailExists = (tempEmail) => {
        if (allEmails.includes(tempEmail)) {
            return true;
        } else {
            return false;
        }
    }

    // sendData here

    const sendData = (e) => {
        e.preventDefault();
        var tempEmail = document.getElementById("email").value;
        var notuniqueEmail = checkEmailExists(tempEmail);

        if (notuniqueEmail === false) {
            allEmails.push(tempEmail);

            fetch(apiUrl("/attendant"),{
                method: "POST",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user_id: user._id,
                    dorm: user.dorm,
                    role: user.role,
                    first_name: document.getElementById("first_name").value,
                    last_name: document.getElementById("last_name").value,
                    middle_name: document.getElementById("middle_name").value,
                    suffix: document.getElementById("suffix").value,
                    sex: document.getElementById("sex").value,
                    birthday: document.getElementById("birth-month").value + " " + document.getElementById("birth-day").value + ", " + document.getElementById("birth-year").value,
                    contact_number: document.getElementById("contact_number").value,
                    email: document.getElementById("email").value,
                    home_address: document.getElementById("home_address").value,
                    base64_string: picture
                })
            })
            .then(response => {return response.json()})
            .then(editDorm)
        }
        else {
            alert("Inputted email address already exists!")
        }
    }

    const editDorm = () => {
        const getAttendant = axios.get(apiUrl("/attendant"), { withCredentials: true });
        axios.all([getAttendant]).then(
            axios.spread((...allData) => {
                editDormInfo(allData[0].data)
            })
        )
    }

    const editDormInfo = (attendant) => {

        if (attendant !== undefined) {
            attendant.map((person, i) => {
                if(i === (attendant.length - 1)) {
                    if (dorm !== undefined) {
                        dorm.map((dorm, i) => {
                            if (person.dorm === dorm.dorm_name) {

                                const currentPerson = person
                                const currentDorm = dorm
                                    
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
                                        office_hours_start: currentDorm.office_hours_start,
                                        office_hours_end: currentDorm.office_hours_end,
                                        late_permit_start: currentDorm.late_permit_start,
                                        late_permit_end: currentDorm.late_permit_end,
                                        overnight_permit_start: currentDorm.overnight_permit_start,
                                        overnight_permit_end: currentDorm.overnight_permit_end,
                                        stayover_permit_start: currentDorm.stayover_permit_start,
                                        dorm_attendant_id: currentPerson._id,
                                        dorm_attendant_name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                                        dorm_attendant_email: document.getElementById("email").value,
                                        dorm_attendant_contact_number: document.getElementById("contact_number").value
                                    })
                                })
                                .then(response => {return response.json()})
                                .then(
                                    fetch(apiUrl("/user/change-completed-profile"), {
                                        method: "PUT",
                                        credentials:'include',
                                        headers:{
                                            'Content-Type':'application/json'
                                        },
                                        body: JSON.stringify({
                                            email: person.email,
                                            completed_profile: true,
                                            profile_id: person._id
                                        })
                                    })
                                    .then(response => {return response.json()})
                                    .then(
                                        alert("Successfully completed attendant profile."),
                                        setTimeout(function(){
                                            window.location.reload();
                                        }, 1000)
                                    )
                                )
                                }
                            })
                    }
                }
            }) 
        }
    }


    const convertToBase64 = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setPicture(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        }

    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        var width = document.getElementById('image-upload').naturalWidth;
        var height = document.getElementById('image-upload').naturalHeight;

        if (width != height) {
            alert("Image must be 1x1 or 2x2. Please try another")
        } else {
            fetch(apiUrl("/picture"),{
                method: "POST",
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    base64_string: picture
                })
            })
            .then(response => {return response.json()})
            .then((data) => console.log(data))
            .then(alert("Successfully uploaded image."))
        }
    };


    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
        }
    },[]);

    return(
        <div>
            <NavBar></NavBar>
            <div classname = 'stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>COMPLETE PROFILE</p>
                    <button className='save-button' onClick={sendData}>SAVE</button>
                </div>
                <hr className='divider'></hr>
                <div className="body-div">
                    <div className='left-div'>
                    <form className='upload-div'>
                            <div className='upload-body'>
                                {picture === "" || picture === null ? "" : <img id='image-upload' width={100} src={picture}></img>}
                                <input className='upload-img-file'  type="file" accept="image/png, image/jpeg, image/jpg" onChange={convertToBase64} ></input>
                                <br></br>
                                <br></br>
                                <br></br>
                                <button className='upload-img-submit' id='submit-btn' type="submit" onClick={onSubmitHandler}>SUBMIT</button>
                            </div>
                            <div className='upload-note'>
                                Upload Picture Here<br></br>(1x1 or 2x2)
                            </div>
                        </form>
                       
                    </div>
                    <div className="right-div">
                        <form className="form-div">
                            <div className="form-div-personal">
                                <h2>PERSONAL STUFF</h2>
                                <table>
                                    <tr className='table-row'>
                                        <td className='cell-title'>First Name</td>
                                        <td className='cell-title'>Middle Name</td>
                                        <td className='cell-title'>Last Name</td>
                                        <td className='cell-title'>Suffix</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type="text" id="first_name" required></input></td>
                                        <td className='cell-input'><input type="text" id="middle_name" ></input></td>
                                        <td className='cell-input'><input type="text" id="last_name" required></input></td>
                                        <td className='cell-input'><input type="text" id="suffix" ></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Assigned Sex</td>
                                        <td className='cell-title'>Birthday</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'>
                                            <select className='custom-select-sex' id="sex" required>
                                                <option>Select Sex</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="intersex">Intersex</option>
                                            </select>
                                        </td>
                                        {/* <td className='cell-input'> */}
                                        <select className='custom-select-birthday-month' id="birth-month">
                                                <option value="January">January</option>
                                                <option value="February">February</option>
                                                <option value="February">March</option>
                                                <option value="April">April</option>
                                                <option value="May">May</option>
                                                <option value="June">June</option>
                                                <option value="July">July</option>
                                                <option value="August">August</option>
                                                <option value="September">September</option>
                                                <option value="October">October</option>
                                                <option value="November">November</option>
                                                <option value="December">December</option>
                                            </select>
                                        {/* </td>
                                        <td className='cell-input'> */}
                                            <select className='custom-select-birthday-day' id="birth-day">
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                            </select>
                                        {/* </td> */}
                                        <td className='cell-input'><input type="text" id="birth-year" placeholder='year'></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Contact Number</td>
                                        <td className='cell-title'>Email</td>
                                        <td className='cell-title'>Home Address</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='contact_number' required></input></td>
                                        <td className='cell-input'><input type='text' id='email' required></input></td>
                                        <td className='cell-input'><input type='text' id='home_address' required></input></td>
                                        
                                        
                                    </tr>
                                
                                </table>

                                
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CompleteAttendantProfile;