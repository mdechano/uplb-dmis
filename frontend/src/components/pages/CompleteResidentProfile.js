import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/CompleteResidentProfile.css'
import NavBar from './NavBar';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";

function CompleteResidentProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [file, setfile] = useState();
    const [finalpicture, setFinalPicture] = useState();
    const [picture, setPicture] = useState();

    let allEmails = []
 
    const fetchData = () => {
        const getResidents = axios.get(apiUrl("/resident"), { withCredentials: true });
        axios.all([getResidents]).then(
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
        var notuniqueEmail = checkEmailExists(tempEmail); // boolean

        const father_details = {
            father_name: document.getElementById("fathername").value,
            father_occupation: document.getElementById("fatheroccupation").value,
            father_monthly_income: document.getElementById("fatherincome").value,
            father_employer: document.getElementById("fatheremployer").value,
            father_office: document.getElementById("fatheroffice").value,
            father_phone: document.getElementById("fatherphone").value
        }

        const mother_details = {
            mother_name: document.getElementById("mothername").value,
            mother_occupation: document.getElementById("motheroccupation").value,
            mother_monthly_income: document.getElementById("motherincome").value,
            mother_employer: document.getElementById("motheremployer").value,
            mother_office: document.getElementById("motheroffice").value,
            mother_phone: document.getElementById("motherphone").value
        }

        const check_in_out_details = {
            first_sem : {
                checkin: document.getElementById("first-sem-checkin").value,
                checkout: document.getElementById("first-sem-checkout").value,
                form5: document.getElementById("first-sem-form5").value,
                room_number: document.getElementById("first-sem-room-number").value
            },
            second_sem : {
                checkin: document.getElementById("second-sem-checkin").value,
                checkout: document.getElementById("second-sem-checkout").value,
                form5: document.getElementById("second-sem-form5").value,
                room_number: document.getElementById("second-sem-room-number").value
            }
           
        }

        const appliances = {
            laptop: document.getElementById("laptop").value,
            gadgets: document.getElementById("gadgets").value,
            printer: document.getElementById("printer").value,
            rice_cooker: document.getElementById("rice-cooker").value,
            electric_fan: document.getElementById("electric-fan").value,
            refrigerator: document.getElementById("refrigerator").value
        }

        const appliances_information = {
            appliance_1 : {
                appliance: document.getElementById("appliance-1").value,
                date_installed_1st_sem: document.getElementById("appliance-1-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-1-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-1-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-1-date-returned-2nd-sem").value
            },
            appliance_2 : {
                appliance: document.getElementById("appliance-2").value,
                date_installed_1st_sem: document.getElementById("appliance-2-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-2-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-2-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-2-date-returned-2nd-sem").value
            },
            appliance_3 : {
                appliance: document.getElementById("appliance-3").value,
                date_installed_1st_sem: document.getElementById("appliance-3-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-3-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-3-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-3-date-returned-2nd-sem").value
            },
            appliance_4 : {
                appliance: document.getElementById("appliance-4").value,
                date_installed_1st_sem: document.getElementById("appliance-4-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-4-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-4-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-4-date-returned-2nd-sem").value
            },
            appliance_5 : {
                appliance: document.getElementById("appliance-5").value,
                date_installed_1st_sem: document.getElementById("appliance-5-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-5-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-5-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-5-date-returned-2nd-sem").value
            },
            appliance_6 : {
                appliance: document.getElementById("appliance-6").value,
                date_installed_1st_sem: document.getElementById("appliance-6-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-6-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-6-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-6-date-returned-2nd-sem").value
            },
            appliance_7 : {
                appliance: document.getElementById("appliance-7").value,
                date_installed_1st_sem: document.getElementById("appliance-7-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-7-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-7-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-7-date-returned-2nd-sem").value
            },
            appliance_8 : {
                appliance: document.getElementById("appliance-8").value,
                date_installed_1st_sem: document.getElementById("appliance-8-date-installed-1st-sem").value,
                date_installed_2nd_sem: document.getElementById("appliance-8-date-installed-2nd-sem").value,
                date_returned_1st_sem: document.getElementById("appliance-8-date-returned-1st-sem").value,
                date_returned_2nd_sem: document.getElementById("appliance-8-date-returned-2nd-sem").value
            },
        }

        const emergency_details = {
            emergency_contact_1 : {
                name: document.getElementById("emergency-contact-name-1").value,
                address: document.getElementById("emergency-contact-address-1").value,
                phone: document.getElementById("emergency-contact-phone-1").value,
            },
            emergency_contact_2 : {
                name: document.getElementById("emergency-contact-name-2").value,
                address: document.getElementById("emergency-contact-address-2").value,
                phone: document.getElementById("emergency-contact-phone-2").value
            }
            
        }

        if (notuniqueEmail === false) {
            allEmails.push(tempEmail);

            fetch(apiUrl("/resident"),{
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
                    student_no: document.getElementById("student_no").value,
                    civil_status: document.getElementById("civil_status").value,
                    birthday: document.getElementById("birth-month").value + " " + document.getElementById("birth-day").value + ", " + document.getElementById("birth-year").value,
                    contact_number: document.getElementById("contact_number").value,
                    email: document.getElementById("email").value,
                    home_address: document.getElementById("home_address").value,
                    region: document.getElementById("region").value,
                    college: document.getElementById("college").value,
                    degree_program: document.getElementById("degree_program").value,
                    last_school_attended: document.getElementById("last_school_attended").value,
                    classification: document.getElementById("classification").value,
                    honors_received: document.getElementById("honors_received").value,
                    talents: document.getElementById("talents").value,
                    hobbies: document.getElementById("hobbies").value,
                    organizations: document.getElementById("organizations").value,
                    ailments: document.getElementById("ailments").value,
                    medications: document.getElementById("medications").value,
                    scholarships: document.getElementById("scholarships").value,
                    monthly_stipend: document.getElementById("monthly_stipend").value,
                    parents_status: document.getElementById("parents-status").value,
                    father_details: father_details,
                    mother_details: mother_details,
                    number_of_brothers: document.getElementById("numberbrothers").value,
                    number_of_sisters: document.getElementById("numbersisters").value,
                    birth_order: document.getElementById("birthorder").value,
                    check_in_out_details: check_in_out_details,
                    appliances: appliances,
                    appliances_information: appliances_information,
                    emergency_details: emergency_details,
                    slas: "None",
                    picture_url: finalpicture
                })
            })
            .then(response => {return response.json()})
            .then(getResidents)
        }
        else {
            alert("Inputted email address already exists!")
        }
    }

    const getResidents = () => {
        const getResident = axios.get(apiUrl("/resident"), { withCredentials: true });
        axios.all([getResident]).then(
            axios.spread((...allData) => {
                setResidentInfo(allData[0].data)
            })
        )
    }

    const setResidentInfo = (resident) =>  {
        if (resident !== undefined) {
            resident.map((person, i) => {
                if(i === (resident.length - 1)){
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
                        alert("Successfully completed resident profile."),
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
    },[]);

    return (
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
                                <h3>PERSONAL INFORMATION</h3>
                                <br></br>
                                <table>
                                    <tr className='table-row'>
                                        <td className='cell-title'>First Name</td>
                                        <td className='cell-title'>Middle Name</td>
                                        <td className='cell-title'>Last Name</td>
                                        <td className='cell-title'>Suffix</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type="text" className='complete-input' id="first_name" name="firstname" required></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="middle_name" name="middlename" required></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="last_name" name="lastname" required></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="suffix" name="suffix"></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Assigned Sex</td>
                                        <td className='cell-title'>Student Number</td>
                                        <td className='cell-title'>Civil Status</td>
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
                                        <td className='cell-input'><input type="text" id="student_no" required placeholder='format: 20XX-XXXXX'></input></td>
                                        <td className='cell-input'><input type="text" id="civil_status" required></input></td>
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
                                        <td className='cell-input'><input type="text" className='year'  id="birth-year" placeholder='year'></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Contact Number</td>
                                        <td className='cell-title'>Email</td>
                                        <td className='cell-title'>Home Address</td>
                                        <td className='cell-title'>Region</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' className='complete-input' id='contact_number' name='contactnumber' required></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='email' name='email' required></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='home_address' name='address' required></input></td>
                                        <td className='cell-input'>
                                            <select className='custom-select-sex' id='region' name='region'>
                                                <option>Select Region</option>
                                                <option value="Region I">Region I</option>
                                                <option value="Region II">Region II</option>
                                                <option value="Region III">Region III</option>
                                                <option value="Region IV-A">Region IV-A</option>
                                                <option value="Region IV-B">Region IV-B</option>
                                                <option value="Region V">Region V</option>
                                                <option value="Region VI">Region VI</option>
                                                <option value="Region VII">Region VII</option>
                                                <option value="Region VIII">Region VIII</option>
                                                <option value="Region IX">Region IX</option>
                                                <option value="Region X">Region X</option>
                                                <option value="Region XI">Region XI</option>
                                                <option value="Region XII">Region XII</option>
                                                <option value="Region XIII">Region XIII</option>
                                                <option value="NCR">NCR</option>
                                                <option value="CAR">CAR</option>
                                                <option value="BARMM">BARMM</option>
                                            </select>
                                        </td>
                                        
                                    </tr>

                                    <tr className='table-row'>
                                        <td className='cell-title'>College</td>
                                        <td className='cell-title'>Degree Program</td>
                                        <td className='cell-title'>Last School Attended</td>
                                        <td className='cell-title'>Classification</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'>
                                            <select className='custom-select-sex' id='college' name='college' required>
                                                <option>Select College</option>
                                                <option value="CAS">CAS</option>
                                                <option value="CAFS">CAFS</option>
                                                <option value="CEAT">CEAT</option>
                                                <option value="CVM">CVM</option>
                                                <option value="CDC">CDC</option>
                                                <option value="CHE">CHE</option>
                                                <option value="CFNR">CFNR</option>
                                                <option value="CEM">CEM</option>
                                                <option value="GS">Graduate School</option>
                                            </select>
                                        </td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='degree_program' placeholder='format: BS Computer Science' required></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='last_school_attended' required></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='classification' ></input></td>
                                        
                                    </tr>

                                    <tr className='table-row'>
                                        <td className='cell-title'>Honors Received</td>
                                        <td className='cell-title'>Talents</td>
                                        <td className='cell-title'>Hobbies</td>
                                        <td className='cell-title'>Organizations</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' className='complete-input' id='honors_received'></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='talents' ></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='hobbies' ></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='organizations' ></input></td>
                                    </tr>

                                    <tr className='table-row'>
                                        <td className='cell-title'>Ailments</td>
                                        <td className='cell-title'>Medications</td>
                                        <td className='cell-title'>Scholarships</td>
                                        <td className='cell-title'>Monthly Stipend</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' className='complete-input' id='ailments' ></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='medications' ></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='scholarships' ></input></td>
                                        <td className='cell-input'><input type='text' className='complete-input' id='monthly_stipend' ></input></td>
                                    </tr>
                                </table>
                            </div>
                            <hr className='horizontal-line'></hr>
                            <br></br>
                            <div className="form-div-family">
                                <h3>FAMILY INFORMATION</h3>
                                <br></br>
                                <table>
                                    <h3 className='cell-title'>Parents' Status</h3>
                                    <br></br>
                                    <div className='custom-select'>
                                        <select  className='custom-select-sex'  id='parents-status'>
                                            <option value=""disabled defaultValue hidden>Choose Parents' Status</option>
                                            <option value='Still Married'>Still Married</option>
                                            <option value='Separated'>Separated</option>
                                            <option value='Remarried'>Remarried</option>
                                            <option value='Single Parent'>Single Parent</option>
                                        </select>   
                                    </div>
                                    <br></br>
                                    <tr>
                                        <td className='cell-title'>Father's Name</td>
                                        <td className='cell-title'>Father's Occupation</td>
                                        <td className='cell-title'>Father's Monthly Income</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" className='complete-input' id="fathername" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="fatheroccupation" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="fatherincome" ></input></td>
                                    </tr>

                                    <tr>
                                        <td className='cell-title'>Name of Firm/Employer of Father</td>
                                        <td className='cell-title'>Office Address of Father</td>
                                        <td className='cell-title'>Father's Cellphone/Telephone no.</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" className='complete-input' id="fatheremployer" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="fatheroffice" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="fatherphone" ></input></td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td className='cell-title'>Mother's Name</td>
                                        <td className='cell-title'>Mother's Occupation</td>
                                        <td className='cell-title'>Mother's Monthly Income</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" className='complete-input' id="mothername" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="motheroccupation" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="motherincome" ></input></td>
                                    </tr>

                                    <tr>
                                        <td className='cell-title'>Name of Firm/Employer of Mother</td>
                                        <td className='cell-title'>Office Address of Mother</td>
                                        <td className='cell-title'>Mother's Cellphone/Telephone no.</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" className='complete-input' id="motheremployer" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="motheroffice" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="motherphone" ></input></td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td className='cell-title'>Number of brother/s</td>
                                        <td className='cell-title'>Number of sister/s</td>
                                        <td className='cell-title'>Birth Order</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" className='complete-input' id="numberbrothers" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="numbersisters" ></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="birthorder" ></input></td>
                                    </tr>

                                </table>
                            </div>
                            <hr className='horizontal-line'></hr>
                            <br></br>
                            <div className="form-div-emergency">
                                <h3>EMERGENCY CONTACT INFORMATION</h3>
                                <br></br>
                                <table>
                                    <tr>
                                        <td className='cell-title'>Name</td>
                                        <td className='cell-title'>Address</td>
                                        <td className='cell-title'>Cellphone/Telephone No.</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type = "text" className='complete-input' id = "emergency-contact-name-1" required></input></td>
                                        <td className='cell-input'><input type = "text" className='complete-input' id = "emergency-contact-address-1" required></input></td>
                                        <td className='cell-input'><input type = "text" className='complete-input' id = "emergency-contact-phone-1" required></input></td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type = "text" className='complete-input' id = "emergency-contact-name-2" ></input></td>
                                        <td className='cell-input'><input type = "text" className='complete-input' id = "emergency-contact-address-2" ></input></td>
                                        <td className='cell-input'><input type = "text" className='complete-input' id = "emergency-contact-phone-2" ></input></td>
                                    </tr>
                                </table>
                            </div>

                            <hr className='horizontal-line'></hr>
                            <br></br>
                            <div className="form-div-checkin">
                                <h2>CHECK IN DETAILS</h2>
                                <table>
                                    <div className='check-in-upper-form'>
                                        <tr>
                                            <td className='cell-title'><th>DATE CHECK IN &nbsp;&nbsp;</th></td>
                                            <td>1st Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="date" id="first-sem-checkin" name="first-sem-checkin"></input></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="date" id="second-sem-checkin" name="second-sem-checkin"></input></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className='cell-title'><th>DATE CHECK OUT &nbsp;&nbsp;</th></td>
                                            <td>1st Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="date" id="first-sem-checkout" name="first-sem-checkout"></input></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="date" id="second-sem-checkout" name="second-sem-checkout"></input></td>
                                        </tr>

                                        <tr>
                                            <td className='cell-title'><th>FORM 5</th></td>
                                            <td>1st Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" className='complete-input' id="first-sem-form5" name="first-sem-form5"></input></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" className='complete-input' id="second-sem-form5" name="second-sem-form5"></input></td>
                                        </tr>

                                        <tr>
                                            <td className='cell-title'><th>ROOM NUMBER</th></td>
                                            <td>1st Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" className='complete-input' id="first-sem-room-number" name="room-number-1"></input></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" className='complete-input' id="second-sem-room-number" name="room-number-2"></input></td>
                                        </tr>

                                    </div>

                                    <br></br>

                                    
                                    <div className='check-in-middle-form'>
                                        
                                        <div className='appliances-left'>
                                            <h3>APPLIANCES</h3>
                                            <br></br>
                                            Indicate number of devices
                                            <br></br>
                                            <br></br>
                                            <tr>
                                                <td><input type='number' id='gadgets'  className='appliances-number'></input></td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;Gadgets (cellphone, iPad, tablet)</td>
                                            </tr>
                                            <tr>
                                                
                                                <td><input type='number' id='laptop'className='appliances-number'></input></td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;Laptop</td>
                                            </tr>
                                            <tr>
                                                <td><input type='number' id='printer' className='appliances-number'></input></td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;Printer</td>
                                            </tr>
                                            <tr>
                                                <td><input type='number' id='rice-cooker' className='appliances-number'></input></td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;Rice Cooker</td>
                                            </tr>
                                        </div>
                                        <div className='appliances-right'>
                                            <h4>Electric Fan</h4>
                                            <div>
                                                
                                                <div className='custom-select'>
                                                    <select className='electric-fan' id='electric-fan'>
                                                        <option value=""disabled defaultValue hidden>Choose Electric Fan size</option>
                                                        <option value='8 inches'>8 inches</option>
                                                        <option value='10 inches'>10 inches</option>
                                                        <option value='12 inches'>12 inches</option>
                                                        <option value='14 inches'>14 inches</option>
                                                        <option value='16 inches'>16 inches</option>
                                                        <option value='18 inches'>18 inches</option>
                                                        <option value='20 inches'>20 inches</option>
                                                        <option value='I do not own an electric fan.'>I do not own an electric fan.</option>
                                                    </select>   
                                                </div>

                                            </div>
                                            <br></br>
                                            <h4>Refrigerator</h4>
                                            <div>
                                                
                                                <div className='custom-select'>
                                                    <select className='refrigerator' id='refrigerator'>
                                                        <option value=""disabled defaultValue hidden>Choose Refrigerator size</option>
                                                        <option value='4 cu. ft.'>4 cu. ft.</option>
                                                        <option value='5 cu. ft.'>5 cu. ft.</option>
                                                        <option value='I do not own a refrigerator.'>I do not own a refrigerator.</option>
                                                    </select>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                        
                                    </div>

                                    <br></br>
                                    <br></br>

                                    <div className='check-in-lower-form'>
                                        <h3>APPLIANCES INFORMATION</h3>
                                        <br></br>
                                        <table>
                                            <tr>
                                                <td className='cell-title'>Appliance</td>
                                                <td className='cell-title'>Date Installed in 1st Sem</td>
                                                <td className='cell-title'>Date Installed in 2nd Sem</td>
                                                <td className='cell-title'>Date Returned in 1st Sem</td>
                                                <td className='cell-title'>Date Returned in 2nd Sem</td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-1"></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-1-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-1-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-1-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-1-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-2" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-2-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-2-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-2-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-2-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-3" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-3-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-3-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-3-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-3-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-4" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-4-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-4-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-4-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-4-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-5" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-5-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-5-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-5-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-5-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-6" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-6-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-6-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-6-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-6-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-7" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-7-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-7-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-7-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-7-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" className='complete-input' id = "appliance-8" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-8-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-8-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-8-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "date" id = "appliance-8-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                        </table>
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

export default CompleteResidentProfile;