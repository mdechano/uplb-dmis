import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios from "axios";
// import '../css/StudentInfoSheetPersonal.css';
import NavBar from './NavBar';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";

function EditStudentCheckIn () {

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
                    check_in_out_details: check_in_out_details,
                    appliances: appliances,
                    appliances_information: appliances_information,
                    emergency_details: currentResident.emergency_details,
                    slas: currentResident.slas,
                    picture_url: currentResident.picture_url
                })
            })
            .then(response => {return response.json()})
            .then(alert("Successfully edited resident profile."),
            navigate('/resident-check-in/'+currentResident._id))
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
                    slas: currentResident.slas,
                    picture_url: url
            })
        })
        .then(response => {return response.json()})
        .then(alert("Successfully changed picture."),fetchData(), setChangePic(false))
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
                    <button className='back-button' onClick = {()=> navigate("/resident-check-in/"+user.profile_id)}>BACK</button>
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
                                    <div className='upload-img-body'>
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
                                            <td><input type="text" id="first-sem-form5" className='complete-input' name="first-sem-form5"></input></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" id="second-sem-form5" className='complete-input' name="second-sem-form5"></input></td>
                                        </tr>

                                        <tr>
                                            <td className='cell-title'><th>ROOM NUMBER</th></td>
                                            <td>1st Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" id="first-sem-room-number" className='complete-input' name="room-number-1"></input></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="text" id="second-sem-room-number" className='complete-input' name="room-number-2"></input></td>
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
                                            {/* <tr>
                                                <td><input type='number' id='rice-cooker' className='appliances-number'></input></td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;Rice Cooker</td>
                                            </tr> */}
                                        </div>
                                        <div className='appliances-right'>

                                            <h4>Rice Cooker</h4>
                                            <div>
                                            <div className='custom-select'>
                                                    <select className='electric-fan' id='rice-cooker'>
                                                        <option value=""disabled defaultValue hidden>Choose Rice Cooker Size</option>
                                                        <option value='small'>Small</option>
                                                        <option value='big'>Big</option>
                                                        <option value='I do not own a rice cooker.'>I do not own a rice cooker.</option>
                                                    </select>   
                                                </div>
                                            </div>
                                            <br></br>
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
                : "" }
            </div>
        </div>
    )


}

export default EditStudentCheckIn;