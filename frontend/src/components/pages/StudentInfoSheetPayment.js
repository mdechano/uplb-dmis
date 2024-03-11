import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetPayment.css'
import NavBar from './NavBar';

function StudentInfoSheetPayment () {

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
                            <button className='stud-info-sheet-nav-payment'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <p>Your confirmed payment will appear here after verification.</p>
                            <label for='sts-bracket'>STS Bracket</label>
                            <p className='sts-bracket-input'>PD80</p>
                            <br></br>
                            <table>
                                <tr>
                                    <th>Term</th>
                                    <th>Period Covered</th>
                                    <th>OR#</th>
                                    <th>Dorm Fee</th>
                                    <th>Appliances</th>
                                    <th>Date Paid</th>
                                </tr>
                                <tr className='table-form-tr'>
                                    <td>1st</td>
                                    <td>September</td>
                                    <td>5660978</td>
                                    <td>500</td>
                                    <td>169</td>
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

export default StudentInfoSheetPayment;