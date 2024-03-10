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
                            <h3>Parents' Status</h3>
                            <br></br>
                            <label class="container"> 
                            <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                            Still Married <br></br>
                            </label>

                            <label class="container"> 
                            <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                            Separated <br></br>
                            </label>

                            <label class="container"> 
                            <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                            Remarried <br></br>
                            </label>

                            <label class="container"> 
                            <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                            Single Parent <br></br>
                            </label>

                            <br></br>

                            <h3>Father's Information</h3>

                            <label for='fathername'>Name</label>
                            <input type="text" id="fathername" name="fathername"></input>

                            <label for='fatheroccupation'>Occupation</label>
                            <input type="text" id="fatheroccupation" name="fatheroccupation"></input>

                            <label for='fatherincome'>Monthly Income</label>
                            <input type="text" id="fatherincome" name="fatherincome"></input>

                            <label for='fatheremployer'>Name of Firm/Employer</label>
                            <input type="text" id="fatheremployer" name="fatheremployer"></input>

                            <label for='fatheroffice'>Office Address</label>
                            <input type="text" id="fatheroffice" name="fatheroffice"></input>

                            <label for='fatherphone'>Cellphone/Telephone no.</label>
                            <input type="text" id="fatherphone" name="fatherphone"></input>
                            
                            <br></br>
                            
                            <h3>Mother's Information</h3>

                            <label for='mothername'>Name</label>
                            <input type="text" id="mothername" name="mothername"></input>

                            <label for='motheroccupation'>Occupation</label>
                            <input type="text" id="motheroccupation" name="motheroccupation"></input>

                            <label for='motherincome'>Monthly Income</label>
                            <input type="text" id="motherincome" name="motherincome"></input>

                            <label for='motheremployer'>Name of Firm/Employer</label>
                            <input type="text" id="motheremployer" name="motheremployer"></input>

                            <label for='motheroffice'>Office Address</label>
                            <input type="text" id="motheroffice" name="motheroffice"></input>

                            <label for='motherphone'>Cellphone/Telephone no.</label>
                            <input type="text" id="motherphone" name="motherphone"></input>

                            <h3>Sibling Information</h3>

                            <label for='numberbrothers'>Number of brother/s</label>
                            <input type="text" id="numberbrothers" name="numberbrothers"></input>

                            <label for='numbersisters'>Number of sister/s</label>
                            <input type="text" id="numbersisters" name="numbersisters"></input>

                            <label for='birthorder'>Birth Order</label>
                            <input type="text" id="birthorder" name="birthorder"></input>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetFamily;