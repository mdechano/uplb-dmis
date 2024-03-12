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
                                <p>ROLE</p>
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
                                <h3 className='cell-title-family'>Parents' Status</h3>
                                <br></br>
                                <tr>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Still Married
                                        </label>
                                    <br></br>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Separated
                                        </label>
                                    <br></br>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Remarried
                                        </label>
                                    <br></br>
                                        <label class="container"> 
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                        Single Parent
                                        </label>
                                    
                                </tr>
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
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetFamily;