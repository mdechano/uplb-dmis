import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
import '../css/StudentInfoSheetPersonal.css';
import NavBar from './NavBar';

function CompleteProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store

    const [fileData, setFileData] = useState();
    const [fileId, setFileId] = useState();
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
        e.prevenDefault();
        var tempEmail = document.getElementById("email").value;
        var notuniqueEmail = checkEmailExists(tempEmail);

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
            refrigerator: document.getElementById("refrigerator").vaule
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
                address: document.getElementById("emergency-address-name-1").value,
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
                    birthday: document.getElementById("birthday").value,
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
                    // payment_details: {type: Object},
                    // violation_details: {type: Object},
                    // picture_id: {type: String},
                    // dorm_id: {type: String}
                })
            })
            .then(response => {return response.json()})
        } else {
            alert("Inputted email address already exists!");
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
            <div classname = 'stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button'>BACK</button>
                    <p className='page-title'>COMPLETE PROFILE</p>
                    <button className='save-button' onClick={sendData}>SAVE</button>
                </div>
                <div className="body-div">
                    <div className='left-div'>
                        <div className='student-div'>
                            <div className='image-div'>
                                image here
                            </div>
                            <div className='profile-info'>
                                <p>ANNA DELA CRUZ</p>
                                <p>2019-08206</p>
                                <p>ROOM NO. 1209</p>
                                <p>ROLE</p>
                            </div>
                        </div>
                        {/* <div className='nav-div'>
                            <button className='stud-info-sheet-nav-personal'><Link to='/student-info-sheet-personal'><a className='info-sheet-btn'>PERSONAL</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div> */}
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
                                        <td className='cell-input'><input type="text" id="first_name" name="firstname"></input></td>
                                        <td className='cell-input'><input type="text" id="middle_name" name="middlename"></input></td>
                                        <td className='cell-input'><input type="text" id="last_name" name="lastname"></input></td>
                                        <td className='cell-input'><input type="text" id="suffix" name="suffix"></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Assigned Sex</td>
                                        <td className='cell-title'>Student Number</td>
                                        <td className='cell-title'>Civil Status</td>
                                        <td className='cell-title'>Birthday</td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'>
                                            <select id="sex" name="sex">
                                                <option>Select Sex</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="intersex">Intersex</option>
                                            </select>
                                        </td>
                                        <td className='cell-input'><input type="text" id="student_no" name="studentnum"></input></td>
                                        <td className='cell-input'><input type="text" id="civil_status" name="civilstatus"></input></td>
                                        <td className='cell-input'><input type='date' id='birthday' name='birthday'></input></td>
                                        
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Contact Number</td>
                                        <td className='cell-title'>Email</td>
                                        <td className='cell-title'>Home Address</td>
                                        <td className='cell-title'>Region</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='contact_number' name='contactnumber'></input></td>
                                        <td className='cell-input'><input type='text' id='email' name='email'></input></td>
                                        <td className='cell-input'><input type='text' id='home_address' name='address'></input></td>
                                        <td className='cell-input'>
                                            <select id='region' name='region'>
                                                <option>Select Region</option>
                                                <option value="region-1">Region I</option>
                                                <option value="region-2">Region II</option>
                                                <option value="region-3">Region III</option>
                                                <option value="region-4a">Region IV-A</option>
                                                <option value="region-4b">Region IV-B</option>
                                                <option value="region-5">Region V</option>
                                                <option value="region-6">Region VI</option>
                                                <option value="region-7">Region VII</option>
                                                <option value="region-8">Region VIII</option>
                                                <option value="region-9">Region IX</option>
                                                <option value="region-10">Region X</option>
                                                <option value="region-11">Region XI</option>
                                                <option value="region-12">Region XII</option>
                                                <option value="region-13">Region XIII</option>
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
                                            <select id='college' name='college'>
                                                <option>Select College</option>
                                                <option value="CAS">CAS</option>
                                                <option value="CAFS">CAFS</option>
                                                <option value="CEAT">CEAT</option>
                                                <option value="CVM">CVM</option>
                                                <option value="CDC">CDC</option>
                                                <option value="CHE">CHE</option>
                                                <option value="CFNR">CFNR</option>
                                                <option value="CEM">CEM</option>
                                            </select>
                                        </td>
                                        <td className='cell-input'><input type='text' id='degree_program' name='degprog'></input></td>
                                        <td className='cell-input'><input type='text' id='last_school_attended' name='last-school'></input></td>
                                        <td className='cell-input'><input type='text' id='classification' name='classification'></input></td>
                                        
                                    </tr>

                                    <tr className='table-row'>
                                        <td className='cell-title'>Honors Received</td>
                                        <td className='cell-title'>Talents</td>
                                        <td className='cell-title'>Hobbies</td>
                                        <td className='cell-title'>Organizations</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='honors_received' name='honors'></input></td>
                                        <td className='cell-input'><input type='text' id='talents' name='talents'></input></td>
                                        <td className='cell-input'><input type='text' id='hobbies' name='hobbies'></input></td>
                                        <td className='cell-input'><input type='text' id='organizations' name='organizations'></input></td>
                                    </tr>

                                    <tr className='table-row'>
                                        <td className='cell-title'>Ailments</td>
                                        <td className='cell-title'>Medications</td>
                                        <td className='cell-title'>Scholarships</td>
                                        <td className='cell-title'>Monthly Stipend</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type='text' id='ailments' name='ailments'></input></td>
                                        <td className='cell-input'><input type='text' id='medications' name='medications'></input></td>
                                        <td className='cell-input'><input type='text' id='scholarships' name='scholarships'></input></td>
                                        <td className='cell-input'><input type='text' id='monthly_stipend' name='stipend'></input></td>
                                    </tr>
                                </table>
                            </div>
                            <div className="form-div-family">
                                <h2>FAMILY STUFF</h2>
                                <table>
                                    <h3 className='cell-title-family'>Parents' Status</h3>
                                    <br></br>
                                    <div className='custom-select'>
                                        <select className='parents-status' id='parents-status'>
                                            <option value=""disabled defaultValue hidden>Choose Parents' Status</option>
                                            <option value='Still Married'>Still Married</option>
                                            <option value='Separated'>Separated</option>
                                            <option value='Remarried'>Remarried</option>
                                            <option value='Single Parent'>Single Parent</option>
                                        </select>   
                                    </div>
                                    
                                    <br></br>
                                    <br></br>
                                    <h3 className='cell-title-family'>Father's Information</h3>
                                    <tr>
                                        <td className='cell-title'>Name</td>
                                        <td className='cell-title'>Occupation</td>
                                        <td className='cell-title'>Monthly Income</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" id="fathername" name="fathername"></input></td>
                                        <td className='cell-input'><input type="text" id="fatheroccupation" name="fatheroccupation"></input></td>
                                        <td className='cell-input'><input type="text" id="fatherincome" name="fatherincome"></input></td>
                                    </tr>

                                    <tr>
                                        <td className='cell-title'>Name of Firm/Employer</td>
                                        <td className='cell-title'>Office Address</td>
                                        <td className='cell-title'>Cellphone/Telephone no.</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" id="fatheremployer" name="fatheremployer"></input></td>
                                        <td className='cell-input'><input type="text" id="fatheroffice" name="fatheroffice"></input></td>
                                        <td className='cell-input'><input type="text" id="fatherphone" name="fatherphone"></input></td>
                                    </tr>
                                    <br></br>
                                    <br></br>
                                    <h3 className='cell-title-family'>Mother's Information</h3>
                                    <tr>
                                        <td className='cell-title'>Name</td>
                                        <td className='cell-title'>Occupation</td>
                                        <td className='cell-title'>Monthly Income</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" id="mothername" name="mothername"></input></td>
                                        <td className='cell-input'><input type="text" id="motheroccupation" name="motheroccupation"></input></td>
                                        <td className='cell-input'><input type="text" id="motherincome" name="motherincome"></input></td>
                                    </tr>

                                    <tr>
                                        <td className='cell-title'>Name of Firm/Employer</td>
                                        <td className='cell-title'>Office Address</td>
                                        <td className='cell-title'>Cellphone/Telephone no.</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" id="motheremployer" name="motheremployer"></input></td>
                                        <td className='cell-input'><input type="text" id="motheroffice" name="motheroffice"></input></td>
                                        <td className='cell-input'><input type="text" id="motherphone" name="motherphone"></input></td>
                                    </tr>
                                    <br></br>
                                    <br></br>
                                    <h3 className='cell-title-family'>Sibling Information</h3>
                                    <tr>
                                        <td className='cell-title'>Number of brother/s</td>
                                        <td className='cell-title'>Number of sister/s</td>
                                        <td className='cell-title'>Birth Order</td>
                                    </tr>
                                    <tr>
                                        <td className='cell-input'><input type="text" id="numberbrothers" name="numberbrothers"></input></td>
                                        <td className='cell-input'><input type="text" id="numbersisters" name="numbersisters"></input></td>
                                        <td className='cell-input'><input type="text" id="birthorder" name="birthorder"></input></td>
                                    </tr>

                                </table>
                            </div>
                            <div className="form-div-emergency">
                                <h2>EMERGENCY STUFF</h2>
                                <table>
                                    <tr>
                                        <th className='cell-title'>Name</th>
                                        <th className='cell-title'>Address</th>
                                        <th className='cell-title'>Cellphone/Telephone No.</th>
                                    </tr>
                                    <tr className='table-form-tr'>
                                        <td className='cell-input'><input type = "text" id = "emergency-contact-name-1" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "emergency-contact-address-1" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "emergency-contact-phone-1" ></input></td>
                                    </tr>
                                    <tr className='table-form-tr'>
                                        <td className='cell-input'><input type = "text" id = "emergency-contact-name-2" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "emergency-contact-address-2" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "emergency-contact-phone-2" ></input></td>
                                    </tr>
                                </table>
                            </div>
                            <div className="form-div-checkin">
                                <h2>CHECKIN STUFF</h2>
                                <table>
                                    <div className='check-in-upper-form'>
                                        <tr>
                                            <td className='cell-title'><th>DATE CHECK IN &nbsp;&nbsp;</th></td>
                                            <td>1st Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="first-sem-checkin" name="first-sem-checkin"></input></td>
                                            <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="second-sem-checkin" name="second-sem-checkin"></input></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className='cell-title'><th>DATE CHECK OUT &nbsp;&nbsp;</th></td>
                                            <td>1st Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="first-sem-checkout" name="first-sem-checkout"></input></td>
                                            <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="second-sem-checkout" name="second-sem-checkout"></input></td>
                                        </tr>

                                        <tr>
                                            <td className='cell-title'><th>FORM 5</th></td>
                                            <td>1st Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="first-sem-form5" name="first-sem-form5"></input></td>
                                            <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="second-sem-form5" name="second-sem-form5"></input></td>
                                        </tr>

                                        <tr>
                                            <td className='cell-title'><th>ROOM NUMBER</th></td>
                                            <td>1st Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="first-sem-room-number" name="room-number-1"></input></td>
                                            <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                            <td><input type="text" id="second-sem-room-number" name="room-number-2"></input></td>
                                        </tr>

                                    </div>
                                    
                                    <div className='check-in-middle-form'>
                                        <div className='appliances-left'>
                                            <h3>APPLIANCES</h3>
                                            Indicate number of devices<br></br>
                                            <tr>
                                                <td><input type='number' id='laptop' name='laptop'></input><br></br></td>
                                                <td>Laptop</td>
                                            </tr>
                                            <tr>
                                                <td><input type='number' id='gadgets' name='gadgets'></input><br></br></td>
                                                <td>Gadgets (cellphone, iPad, tablet)</td>
                                            </tr>
                                            <tr>
                                                <td><input type='number' id='printer' name='printer'></input><br></br></td>
                                                <td>Printer</td>
                                            </tr>
                                            <tr>
                                                <td><input type='number' id='rice-cooker' name='rice-cooker'></input><br></br></td>
                                                <td>Rice Cooker</td>
                                            </tr>
                                        </div>
                                        <div className='appliances-middle'>
                                            <h3>Electric Fan</h3>
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
                                        <div className='appliances-right'>
                                            <h3>Refrigerator</h3>
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

                                    <div className='check-in-lower-form'>
                                        <h3>APPLIANCES INFORMATION</h3>
                                        <table>
                                            <tr>
                                                <th className='cell-title'>Appliance</th>
                                                <th className='cell-title'>Date Installed in 1st Sem</th>
                                                <th className='cell-title'>Date Installed in 2nd Sem</th>
                                                <th className='cell-title'>Date Returned in 1st Sem</th>
                                                <th className='cell-title'>Date Returned in 2nd Sem</th>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-1"></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-1-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-1-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-1-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-1-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-2" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-2-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-2-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-2-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-2-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-3" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-3-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-3-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-3-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-3-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-4" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-4-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-4-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-4-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-4-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-5" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-5-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-5-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-5-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-5-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-6" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-6-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-6-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-6-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-6-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-7" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-7-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-7-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-7-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-7-date-returned-2nd-sem" ></input></td>
                                            </tr>
                                            <tr className='table-form-tr'>
                                                <td className='cell-input'><input type = "text" id = "appliance-8" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-8-date-installed-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-8-date-installed-2nd-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-8-date-returned-1st-sem" ></input></td>
                                                <td className='cell-input'><input type = "text" id = "appliance-8-date-returned-2nd-sem" ></input></td>
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

export default CompleteProfile;