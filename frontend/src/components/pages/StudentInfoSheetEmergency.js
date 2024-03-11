import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetEmergency.css'
import NavBar from './NavBar';

function StudentInfoSheetEmergency () {

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
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-personal'><a className='info-sheet-btn'>PERSONAL</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav-emergency'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <h3>IN CASE OF EMERGENCY, PLEASE CONTACT THE FOLLOWING: </h3>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Cellphone/Telephone No.</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td><input type = "text" id = "emergency-contact-name-1" ></input></td>
                                    <td><input type = "text" id = "emergency-contact-address-1" ></input></td>
                                    <td><input type = "text" id = "emergency-contact-phone-1" ></input></td>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td><input type = "text" id = "emergency-contact-name-2" ></input></td>
                                    <td><input type = "text" id = "emergency-contact-address-2" ></input></td>
                                    <td><input type = "text" id = "emergency-contact-phone-2" ></input></td>
                                </tr>
                            </table>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetEmergency;