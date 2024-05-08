import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/CompleteManagerProfile.css';
import NavBar from './NavBar';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";

function CompleteManagerProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [file, setfile] = useState();
    const [finalpicture, setFinalPicture] = useState();
    const [picture, setPicture] = useState();

    let allEmails = []
 
    const fetchData = () => {
        const getManagers = axios.get(apiUrl("/manager"), { withCredentials: true });
        axios.all([getManagers]).then(
            axios.spread((...allData) => {
                for (let i = 0; i < allData[0].data.length; i++) {
                    allEmails.push(allData[0].data[i].email)
                }
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

    const sendData = (e) => {
        e.preventDefault();
        var tempEmail = document.getElementById("email").value;
        var notuniqueEmail = checkEmailExists(tempEmail);

        if (notuniqueEmail === false) {
            allEmails.push(tempEmail);

            fetch(apiUrl("/manager"),{
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
                    picture_url: finalpicture
                })
            })
            .then(response => {return response.json()})
            .then(getManagers)
        } 
        else {
            alert("Inputted email address already exists!")
        }
    }

    const getManagers = () => {
        const getManagers = axios.get(apiUrl("/manager"), { withCredentials: true });
        axios.all([getManagers]).then(
            axios.spread((...allData) => {
                sendDormInfo(allData[0].data)
            })
        )
    }

    const sendDormInfo = (manager) => {
        
        if (manager !== undefined) {
            manager.map((person, i) => {
                if(i === (manager.length - 1)){

                    fetch(apiUrl("/dorm/"),{
                        method: "POST",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            dorm_name: user.dorm,
                            dorm_manager_id: person._id,
                            dorm_manager_name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                            dorm_manager_email: document.getElementById("email").value,
                            dorm_manager_contact_number: document.getElementById("contact_number").value,
                            office_hours_start: document.getElementById("office_hours_start").value,
                            office_hours_end: document.getElementById("office_hours_end").value,
                            late_permit_start: document.getElementById("late_permit_start").value,
                            late_permit_end: document.getElementById("late_permit_end").value,
                            overnight_permit_start: document.getElementById("overnight_permit_start").value,
                            overnight_permit_end: document.getElementById("overnight_permit_end").value,
                            stayover_permit_start: document.getElementById("stayover_permit_start").value
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
                    }))
                    .then(response => {return response.json()})
                    .then(
                        alert("Successfully completed manager profile and submitted dorm information."),
                        setTimeout(function(){
                            window.location.reload();
                        }, 1000)
                    )
                }
            }) 
        }
    }

    const handleFileSelected = (e) => {
        // base64 assignment for UI viewing
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]); 
        reader.onload = () => {
            console.log(reader.result);
            setPicture(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        }
        // supabase assignment
        setfile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        var width = document.getElementById('image-upload').naturalWidth;
        var height = document.getElementById('image-upload').naturalHeight;

        if (width !== height) {
            alert("Image must be 1x1 or 2x2. Please try another");
        } else {
            // upload image
            const filename = `${uuidv4()}-${file.name}`;
            const { data, error } = await supabase.storage.from("profile-pictures").upload(filename, file, {
                cacheControl: "3600",
                upsert: false,
            });
            // get generated data path
            const filepath = data.path;
            // get and save public URL in picture_url
            const { data: image } = supabase.storage.from('profile-pictures').getPublicUrl(`${filepath}`);
            setFinalPicture(image.publicUrl);
            alert("Successfully uploaded image.")
        }
    };

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
        }
    },[picture]);

    return (
        <div>
            <NavBar></NavBar>
            <div classname = 'complete-manager-profile-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    <p className='page-title'>COMPLETE MANAGER PROFILE</p>
                    <button className='save-button' onClick={sendData}>SAVE</button>
                </div>
                <hr className='divider'></hr>
                <div className="body-div">
                    <div className='left-div'>
                        <form className='upload-div'>
                            <div className='upload-body'>
                            {picture === "" || picture === null ? "" : <img id='image-upload' width={100} src={picture}></img>}
                            <br></br>
                            <br></br>
                            <input type="file" className="custom-file-upload" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelected} />
                            <br></br>
                            <br></br>
                            <button type="submit" className='upload-img-submit' onClick={handleSubmit}>UPLOAD IMAGE</button>
                            </div>
                            <div className='upload-note'>
                                Upload Picture Here<br></br>(1x1 or 2x2)
                            </div>
                        </form>
                        
                    </div>

                    <div className="right-div">
                        <form className="form-div">
                            <div className="form-div-personal">
                                <h2 className='section-label'>PERSONAL INFORMATION</h2>
                                <table className='info-table'>
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
                                            <select className='custom-select-birthday-month' id="birth-month" >
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
                                        <td className='cell-input'><input type="text" className='year' id="birth-year" placeholder='year'></input></td>
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

                                <h2 className='section-label'>DORM INFORMATION</h2>
                                <p className='paragraph'>Complete dorm information here.</p>
                                <table className='dorm-info-table'>
                                    <div className='dorm-info-table-left'>
                                        <tr className='table-row'>
                                        <td className='cell-title'>Residence Hall Name</td>
                                        </tr>
                                        { user ?
                                        <tr className='table-row'>
                                            <td className='cell-input'>{user.dorm}</td>
                                        </tr>
                                        : ""}
                                        
                                        <tr className='table-row'>
                                        <td className='cell-title'>Office Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-input'>FROM <input type='time' id='office_hours_start' required></input></td>
                                            <td className='cell-input'>TO <input type='time' id='office_hours_end' required></input></td>
                                        </tr>
                                    </div>
                                    
                                    <div className='dorm-info-table-right'>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Late Permit Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                        <td className='cell-input'>FROM <input type='time' id='late_permit_start' required></input></td>
                                            <td className='cell-input'>TO <input type='time' id='late_permit_end' required></input></td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Overnight Permit Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                        <td className='cell-input'>FROM <input type='time' id='overnight_permit_start' required></input></td>
                                            <td className='cell-input'>TO <input type='time' id='overnight_permit_end' required></input></td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Stayover/Homebound Permit Hours</td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-input'>FROM <input type='time' id='stayover_permit_start' required></input></td>
                                        </tr>
                                    </div>
                                    
                                </table>

                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )


}

export default CompleteManagerProfile;