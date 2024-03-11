import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetViolation.css'
import NavBar from './NavBar';

function StudentInfoSheetViolation () {

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
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav-violation'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <p>Your confirmed violations will be recorded here.</p>
                            <br></br>
                            <table>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Nature</th>
                                    <th>Remarks</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td>3-4-24</td>
                                    <td>11:30PM</td>
                                    <td>asdfg</td>
                                    <td>qwert</td>
                                </tr>
                                <tr className='table-form-tr'>
                                    
                                </tr>
                            </table>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetViolation;