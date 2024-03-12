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
                                <p>ROLE</p>
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
                                <tr className='table-row'>
                                    <td className='cell-title'>First Name</td>
                                    <td className='cell-title'>Middle Name</td>
                                    <td className='cell-title'>Last Name</td>
                                    <td className='cell-title'>Suffix</td>
                                    
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'><input type="text" id="fname" name="firstname"></input></td>
                                    <td className='cell-input'><input type="text" id="mname" name="middlename"></input></td>
                                    <td className='cell-input'><input type="text" id="lname" name="lastname"></input></td>
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
                                    <td className='cell-input'><input type="text" id="studnum" name="studentnum"></input></td>
                                    <td className='cell-input'><input type="text" id="civstatus" name="civilstatus"></input></td>
                                    <td className='cell-input'><input type='date' id='birthday' name='birthday'></input></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Contact Number</td>
                                    <td className='cell-title'>Email</td>
                                    <td className='cell-title'>Home Address</td>
                                    <td className='cell-title'>Region</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'><input type='text' id='contactnumber' name='contactnumber'></input></td>
                                    <td className='cell-input'><input type='text' id='email' name='email'></input></td>
                                    <td className='cell-input'><input type='text' id='address' name='address'></input></td>
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
                                    <td className='cell-input'><input type='text' id='degprog' name='degprog'></input></td>
                                    <td className='cell-input'><input type='text' id='last-school' name='last-school'></input></td>
                                    <td className='cell-input'><input type='text' id='classification' name='classification'></input></td>
                                    
                                </tr>

                                <tr className='table-row'>
                                    <td className='cell-title'>Honors Received</td>
                                    <td className='cell-title'>Talents</td>
                                    <td className='cell-title'>Hobbies</td>
                                    <td className='cell-title'>Organizations</td>
                                </tr>
                                <tr className='table-row'>
                                    <td className='cell-input'><input type='text' id='honors' name='honors'></input></td>
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
                                    <td className='cell-input'><input type='text' id='stipend' name='stipend'></input></td>
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