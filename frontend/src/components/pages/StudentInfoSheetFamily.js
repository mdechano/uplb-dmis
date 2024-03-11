import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetFamily.css'
import NavBar from './NavBar';

function StudentInfoSheetFamily () {

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
                            <button className='stud-info-sheet-nav-family'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                            <table>
                                <h3>Parents' Status</h3>
                                <br></br>
                                <tr>
                                    <td>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Still Married
                                        </label>
                                    </td>
                                    <td>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Separated
                                        </label>
                                    </td>
                                    <td>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Remarried
                                        </label>
                                    </td>
                                    <td>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Single Parent
                                        </label>
                                    </td>
                                </tr>

                                <h3>Father's Information</h3>
                                <tr>
                                    <td>Name</td>
                                    <td>Occupation</td>
                                    <td>Monthly Income</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="fathername" name="fathername"></input></td>
                                    <td><input type="text" id="fatheroccupation" name="fatheroccupation"></input></td>
                                    <td><input type="text" id="fatherincome" name="fatherincome"></input></td>
                                </tr>

                                <tr>
                                    <td>Name of Firm/Employer</td>
                                    <td>Office Address</td>
                                    <td>Cellphone/Telephone no.</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="fatheremployer" name="fatheremployer"></input></td>
                                    <td><input type="text" id="fatheroffice" name="fatheroffice"></input></td>
                                    <td><input type="text" id="fatherphone" name="fatherphone"></input></td>
                                </tr>

                                <h3>Mother's Information</h3>
                                <tr>
                                    <td>Name</td>
                                    <td>Occupation</td>
                                    <td>Monthly Income</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="mothername" name="mothername"></input></td>
                                    <td><input type="text" id="motheroccupation" name="motheroccupation"></input></td>
                                    <td><input type="text" id="motherincome" name="motherincome"></input></td>
                                </tr>

                                <tr>
                                    <td>Name of Firm/Employer</td>
                                    <td>Office Address</td>
                                    <td>Cellphone/Telephone no.</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="motheremployer" name="motheremployer"></input></td>
                                    <td><input type="text" id="motheroffice" name="motheroffice"></input></td>
                                    <td><input type="text" id="motherphone" name="motherphone"></input></td>
                                </tr>

                                <h3>Sibling Information</h3>
                                <tr>
                                    <td>Number of brother/s</td>
                                    <td>Number of sister/s</td>
                                    <td>Birth Order</td>
                                </tr>
                                <tr>
                                    <td><input type="text" id="numberbrothers" name="numberbrothers"></input></td>
                                    <td><input type="text" id="numbersisters" name="numbersisters"></input></td>
                                    <td><input type="text" id="birthorder" name="birthorder"></input></td>
                                </tr>

                            </table>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetFamily;