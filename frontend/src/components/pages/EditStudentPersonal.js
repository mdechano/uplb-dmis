import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
// import '../css/StudentInfoSheetPersonal.css';
import NavBar from './NavBar';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";

function EditStudentPersonal () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentResident, setResident] = useState();
    const [changePic, setChangePic] = useState(false);
    const [file, setfile] = useState();
    const [picture, setPicture] = useState();

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
            axios.all([getResident]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    setResident(allResidentData)
                })
            )
    }

    const editStudent = () => {

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

        if (currentResident !== undefined) {
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
                    check_in_out_details: currentResident.check_in_out_details,
                    appliances: currentResident.appliances,
                    appliances_information: currentResident.appliances_information,
                    emergency_details: emergency_details,
                    slas: "None",
                    picture_url: currentResident.picture_url
                    // soon: pass payment and violation deets from personel edits
                })
            })
            .then(response => {return response.json()})
            .then(alert("Successfully edited resident profile."),
            setTimeout(function(){
                window.location.reload();
             }, 1000))
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
                    slas: "None",
                    picture_url: url
            })
        })
        .then(response => {return response.json()})
        .then(alert("Successfully changed picture."))
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

            <div classname = 'stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/resident-personal/"+user.profile_id)}>BACK</button>
                    <p className='page-title'>EDIT RESIDENT PROFILE</p>
                    <button className='save-button' onClick={editStudent}>SAVE</button>
                </div>
                <hr className='divider'></hr>
                { currentResident !== undefined ? 
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
                                    <img className='profile-pic' width={200} src={currentResident.picture_url}></img>
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

                            
                        </form>
                    </div>
                </div>
                : ""}
            </div>
        </div>
    )

}

export default EditStudentPersonal;