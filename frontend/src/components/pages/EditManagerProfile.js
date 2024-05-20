import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import axios, { all } from "axios";
import {apiUrl} from '../utilities/apiUrl';
import '../css/EditManagerProfile.css'
import NavBar from '../pages/NavBar';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";

function EditManagerProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    
    const [dorm, setDorm] = useState();
    const [manager, setManager] = useState();
    const [changePic, setChangePic] = useState(false);
    const [file, setfile] = useState();
    const [picture, setPicture] = useState();
   
    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getManager = axios.get(apiUrl("/manager/" + id), { withCredentials: true });
        const getDorm = axios.get(apiUrl("/dorm"), { withCredentials: true });
        axios.all([getManager, getDorm]).then(
            axios.spread((...allData) => {
                setManager(allData[0].data)
                setDorm(allData[1].data)
            })
        )
    }

    const editManager = () => {
        fetch(apiUrl("/manager/"+manager._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user_id: manager.user_id,
                dorm: manager.dorm,
                role: manager.role,
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                middle_name: document.getElementById("middle_name").value,
                suffix: document.getElementById("suffix").value,
                sex: document.getElementById("sex").value,
                birthday: document.getElementById("birth-month").value + " " + document.getElementById("birth-day").value + ", " + document.getElementById("birth-year").value,
                contact_number: document.getElementById("contact_number").value,
                email: document.getElementById("email").value,
                home_address: document.getElementById("home_address").value,
                picture_url: manager.picture_url
            })
        })
        .then(response => {return response.json()})
        .then(editDormInfo)
    }

    const editDormInfo = () => {
        if (manager !== undefined) {
            if (dorm !== undefined) {
                dorm.map((dorm, i) => {
                    if (manager.dorm === dorm.dorm_name) {
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
                                dorm_manager_name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                                dorm_manager_email: document.getElementById("email").value,
                                dorm_manager_contact_number: document.getElementById("contact_number").value,
                                office_hours_start: currentDorm.office_hours_start,
                                office_hours_end: currentDorm.office_hours_end,
                                late_permit_start: currentDorm.late_permit_start,
                                late_permit_end: currentDorm.late_permit_end,
                                overnight_permit_start: currentDorm.overnight_permit_start,
                                overnight_permit_end: currentDorm.overnight_permit_end,
                                stayover_permit_start: currentDorm.stayover_permit_start,
                                dorm_attendant_id: currentDorm.dorm_attendant_id,
                                dorm_attendant_name: currentDorm.dorm_attendant_name,
                                dorm_attendant_email: currentDorm.dorm_attendant_email,
                                dorm_attendant_contact_number: currentDorm.dorm_attendant_contact_number
                            })
                        })       
                        .then(response => {return response.json()})
                        .then(
                            alert("Successfully editted manager profile."),
                            navigate('/manager/'+manager._id)
                        )
                    }
                })
            }                                
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
            // setFinalPicture(image.publicUrl);
            updatePictureUrl(image.publicUrl)
        }
    };

    const updatePictureUrl = (url) => {
        fetch(apiUrl("/manager/"+manager._id),{
            method: "PUT",
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user_id: manager.user_id,
                dorm: manager.dorm,
                role: manager.role,
                first_name: manager.first_name,
                last_name: manager.last_name,
                middle_name: manager.middle_name,
                suffix: manager.suffix,
                sex: manager.sex,
                birthday: manager.birthday,
                contact_number: manager.contact_number,
                email: manager.email,
                home_address: manager.home_address,
                picture_url: url
            })
        })
        .then(response => {return response.json()})
        .then(alert("Successfully changed picture."), setChangePic(false))
    }

    const flag_change_pic = () => {
        setChangePic(true)
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
            <div classname = 'complete-manager-profile-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/manager/"+user.profile_id)}>BACK</button>
                    <p className='page-title'>EDIT MANAGER PROFILE</p>
                    <button className='save-button' onClick={editManager}>SAVE</button>
                </div>
                <hr className='divider'></hr>
                { manager !== undefined ?
                <div className="body-div">
                    <div className='left-div'>
                        <form className='upload-div'>
                            { changePic === true ? 
                                <div>
                                    <div className='upload-body'>
                                        {picture === "" || picture === null ? "" : <img id='image-upload' width={100} src={picture}></img>}
                                        <input className='upload-img-file'  type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelected} ></input>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <button className='upload-img-submit' type="submit" onClick={handleSubmit} >UPLOAD IMAGE</button>
                                    </div>
                                    <div className='upload-note'>
                                        Upload Picture Here<br></br>(1x1 or 2x2)
                                    </div>
                                </div>
                            :
                                <div>
                                    <img className='profile-pic' width={200} src={manager.picture_url}></img>
                                    <br></br>
                                    <br></br>
                                    <button className='change-picture' onClick={flag_change_pic}>CHANGE PICTURE</button>
                                </div>
                            }
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
                                        <td className='cell-input'><input type="text" className='complete-input' id="first_name" required></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="middle_name" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="last_name" required></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="suffix" ></input></td>
                                        
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
                                        <td className='cell-input'><input type="text" className='complete-input'  id="birth-year" placeholder='year'></input></td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Contact Number</td>
                                        <td className='cell-title'>Email</td>
                                        <td className='cell-title'>Home Address</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' className='complete-input' id='contact_number' required></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='email' required></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='home_address' required></input></td>
                                        
                                        
                                    </tr>
                                
                                </table>

                                
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
                : ""}
            </div>
        </div>
    )


}

export default EditManagerProfile;