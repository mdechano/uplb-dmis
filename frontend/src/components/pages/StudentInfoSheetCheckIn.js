import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetCheckIn.css'
import NavBar from './NavBar';

function StudentInfoSheetCheckIn () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
            <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
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
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-family'><a className='info-sheet-btn'>FAMILY</a></Link></button>
                            <button className='stud-info-sheet-nav-check-in'><Link to='/student-info-sheet-check-in'><a className='info-sheet-btn'>CHECK IN</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-emergency'><a className='info-sheet-btn'>EMERGENCY</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-payment'><a className='info-sheet-btn'>PAYMENT</a></Link></button>
                            <button className='stud-info-sheet-nav'><Link to='/student-info-sheet-violation'><a className='info-sheet-btn'>VIOLATION</a></Link></button>
                        </div>
                    </div>
                    <div className='right-div'>
                        
                        <form className='form-div'>
                            <table>
                                <div className='check-in-upper-form'>
                                    <tr>
                                        <td className='cell-title'><th>DATE CHECK IN &nbsp;&nbsp;</th></td>
                                        <td>1st Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="first-sem-checkin" name="first-sem-checkin"></input></td>
                                        <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="second-sem-checkin" name="second-sem-checkin"></input></td>
                                    </tr>
                                    
                                    <tr>
                                        <td className='cell-title'><th>DATE CHECK OUT &nbsp;&nbsp;</th></td>
                                        <td>1st Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="first-sem-checkout" name="first-sem-checkout"></input></td>
                                        <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="second-sem-checkout" name="second-sem-checkout"></input></td>
                                    </tr>

                                    <tr>
                                        <td className='cell-title'><th>FORM 5</th></td>
                                        <td>1st Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="first-sem-form5" name="first-sem-form5"></input></td>
                                        <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="second-sem-form5" name="second-sem-form5"></input></td>
                                    </tr>

                                    <tr>
                                        <td className='cell-title'><th>ROOM NUMBER</th></td>
                                        <td>1st Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="first-sem-room-number" name="room-number-1"></input></td>
                                        <td>&nbsp;&nbsp;2nd Sem &nbsp;&nbsp;</td>
                                        <td><input type="text" id="second-sem-room-number" name="room-number-2"></input></td>
                                    </tr>

                                </div>
                                
                                <div className='check-in-middle-form'>
                                    <div className='appliances-left'>
                                        <h3>APPLIANCES</h3>
                                        Indicate number of devices<br></br>
                                        <tr>
                                            <td><input type='number' id='laptop' name='laptop'></input><br></br></td>
                                            <td>Laptop</td>
                                        </tr>
                                        <tr>
                                            <td><input type='number' id='gadgets' name='gadgets'></input><br></br></td>
                                            <td>Gadgets (cellphone, iPad, tablet)</td>
                                        </tr>
                                        <tr>
                                            <td><input type='number' id='printer' name='printer'></input><br></br></td>
                                            <td>Printer</td>
                                        </tr>
                                        <tr>
                                            <td><input type='number' id='rice-cooker' name='rice-cooker'></input><br></br></td>
                                            <td>Rice Cooker</td>
                                        </tr>
                                    </div>
                                    <div className='appliances-middle'>
                                        <h3>Electric Fan</h3>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            8 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            10 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            12 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            14 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            16 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            18 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            20 inches <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            I do not own an electric fan. <br></br>
                                            </label>
                                        </tr>
                                    </div>
                                    <div className='appliances-right'>
                                        <h3>Refrigerator</h3>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            4 cu.ft. <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            5 cu.ft. <br></br>
                                            </label>
                                        </tr>
                                        <tr>
                                            <label class="container"> 
                                            <input type="radio" name="radio" />
                                            <span class="checkmark"></span>
                                            I do not own a fridge. <br></br>
                                            </label>
                                        </tr>
                                    </div>
                                    
                                </div>
                                

                            </table>

                            <div className='check-in-lower-form'>
                                <h3>APPLIANCES INFORMATION</h3>
                                <table>
                                    <tr>
                                        <th className='cell-title'>Appliance</th>
                                        <th className='cell-title'>Date Installed in 1st Sem</th>
                                        <th className='cell-title'>Date Installed in 2nd Sem</th>
                                        <th className='cell-title'>Date Returned in 1st Sem</th>
                                        <th className='cell-title'>Date Returned in 2nd Sem</th>
                                    </tr>
                                    <tr className='table-form-tr'>
                                        <td className='cell-input'><input type = "text" id = "appliance-1"></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-installed-1st-sem-1" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-installed-2nd-sem-1" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-returned-1st-sem-1" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-returned-2nd-sem-1" ></input></td>
                                    </tr>
                                    <tr className='table-form-tr'>
                                        <td className='cell-input'><input type = "text" id = "appliance-2" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-installed-1st-sem-2" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-installed-2nd-sem-2" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-returned-1st-sem-2" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-returned-2nd-sem-2" ></input></td>
                                    </tr>
                                    <tr className='table-form-tr'>
                                        <td className='cell-input'><input type = "text" id = "appliance-3" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-installed-1st-sem-3" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-installed-2nd-sem-3" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-returned-1st-sem-3" ></input></td>
                                        <td className='cell-input'><input type = "text" id = "date-returned-2nd-sem-3" ></input></td>
                                    </tr>
                                </table>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StudentInfoSheetCheckIn;