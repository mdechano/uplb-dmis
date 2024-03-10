import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetCheckIn.css'
import NavBar from './NavBar';

function StudentInfoSheetCheckIn () {

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
                            <button className='stud-info-sheet-nav-check-in'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        <form className='form-div'>
                           <div className='check-in-upper-form'>
                                <h4>DATE CHECK IN</h4>
                                <label for='first-sem-checkin'>1st Sem</label>
                                <input type="text" id="first-sem-checkin" name="first-sem-checkin"></input>
                                <label for='second-sem-checkin'>2nd Sem</label>
                                <input type="text" id="second-sem-checkin" name="second-sem-checkin"></input>
                                <h4>DATE CHECK OUT</h4>
                                <label for='first-sem-checkout'>1st Sem</label>
                                <input type="text" id="first-sem-checkout" name="first-sem-checkout"></input>
                                <label for='second-sem-checkout'>2nd Sem</label>
                                <input type="text" id="second-sem-checkout" name="second-sem-checkout"></input>
                                <h4>FORM 5</h4>
                                <label for='first-sem-form5'>1st Sem</label>
                                <input type="text" id="first-sem-form5" name="first-sem-form5"></input>
                                <label for='second-sem-form5'>2nd Sem</label>
                                <input type="text" id="second-sem-form5" name="second-sem-form5"></input>
                                <h4>ROOM NUMBER</h4>
                                <label for='room-number'>1st Sem</label>
                                <input type="text" id="room-number" name="room-number"></input>
                                <label for='room-number'>2nd Sem</label>
                                <input type="text" id="room-number" name="room-number"></input>
                           </div>
                           <div className='check-in-middle-form'>
                                <h3>APPLIANCES</h3>
                                Indicate number of devices<br></br>
                                <label for='laptop'>Laptop </label>     
                                <input type='number' id='laptop' name='laptop'></input><br></br>
                                <label for='gadgets'>Gadgets (cellphone, iPad, tablet) </label>     
                                <input type='number' id='gadgets' name='gadgets'></input><br></br>
                                <label for='printer'>Printer </label>     
                                <input type='number' id='printer' name='printer'></input><br></br>
                                <label for='rice-cooker'>Rice Cooker </label>     
                                <input type='number' id='rice-cooker' name='rice-cooker'></input><br></br>

                                <br></br>

                                <h4>Electric Fan</h4>
                                <br></br>
                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                8 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                10 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                12 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                14 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                16 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                18 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                20 inches <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                I do not own an electric fan. <br></br>
                                </label>

                                <br></br>

                                <h4>Refrigerator</h4>
                                <br></br>
                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                4 cu.ft. <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                5 cu.ft. <br></br>
                                </label>

                                <label class="container"> 
                                <input type="radio" name="radio" />
                                <span class="checkmark"></span>
                                I do not own a fridge. <br></br>
                                </label>

                           </div>
                           <div className='check-in-lower-form'>
                                <h3>APPLIANCES INFORMATION</h3>
                                
                           </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetCheckIn;