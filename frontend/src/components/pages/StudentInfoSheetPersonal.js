import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetPersonal.css'
import NavBar from './NavBar';

function StudentInfoSheetPersonal () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button'>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <button className='save-button'>SAVE</button>
                </div>
                <div className='body-div'>
                    <div className='left-div'>
                        <div className='student-div'>
                            <div className='image-div'>
                                image here
                            </div>
                            <div className='profile-info'>
                                <p>ANNA DELA CRUZ</p>
                                <p>2019-08206</p>
                                <p>ROOM NO. 1209</p>
                            </div>
                        </div>
                        <div className='nav-div'>
                            <button className='stud-info-sheet-nav-personal'><Link to='/student-info-sheet-personal'><a className='info-sheet-btn'>PERSONAL</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <table>
                                <tr>
                                    <td>First Name</td>
                                    <td>Middle Name</td>
                                    <td>Last Name</td>
                                    <td>Suffix</td>
                                    <td>Assigned Sex</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="fname" name="firstname"></input></td>
                                    <td><input type="text" id="mname" name="middlename"></input></td>
                                    <td><input type="text" id="lname" name="lastname"></input></td>
                                    <td><input type="text" id="suffix" name="suffix"></input></td>
                                    <td>
                                        <select id="sex" name="sex">
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                            <option value="intersex">Intersex</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Student Number</td>
                                    <td>Civil Status</td>
                                    <td>Birthday</td>
                                    <td>Contact Number</td>
                                    <td>Email</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="studnum" name="studentnum"></input></td>
                                    <td><input type="text" id="civstatus" name="civilstatus"></input></td>
                                    <td><input type='date' id='birthday' name='birthday'></input></td>
                                    <td><input type='text' id='contactnumber' name='contactnumber'></input></td>
                                    <td><input type='text' id='email' name='email'></input></td>
                                </tr>

                                <tr>
                                    <td>Home Address</td>
                                    <td>Region</td>
                                    <td>College</td>
                                    <td>Degree Program</td>
                                </tr>
                                <tr>
                                    <td><input type='text' id='address' name='address'></input></td>
                                    <td>
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
                                    <td>
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
                                    <td><input type='text' id='degprog' name='degprog'></input></td>
                                </tr>

                                <tr>
                                    <td>Last School Attended</td>
                                    <td>Classification</td>
                                    <td>Honors Received</td>
                                </tr>
                                <tr>
                                    <td><input type='text' id='last-school' name='last-school'></input></td>
                                    <td><input type='text' id='classification' name='classification'></input></td>
                                    <td><input type='text' id='honors' name='honors'></input></td>
                                </tr>

                                <tr>
                                    <td>Talents</td>
                                    <td>Hobbies</td>
                                    <td>Organizations</td>
                                </tr>
                                <tr>
                                    <td><input type='text' id='talents' name='talents'></input></td>
                                    <td><input type='text' id='hobbies' name='hobbies'></input></td>
                                    <td><input type='text' id='organizations' name='organizations'></input></td>
                                </tr>

                                <tr>
                                    <td>Ailments</td>
                                    <td>Medications</td>
                                    <td>Scholarships</td>
                                    <td>Monthly Stipend</td>
                                </tr>
                                <tr>
                                    <td><input type='text' id='ailments' name='ailments'></input></td>
                                    <td><input type='text' id='medications' name='medications'></input></td>
                                    <td><input type='text' id='scholarships' name='scholarships'></input></td>
                                    <td><input type='text' id='stipend' name='stipend'></input></td>
                                </tr>

                            </table>
                            
                        </form>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )

}

export default StudentInfoSheetPersonal;