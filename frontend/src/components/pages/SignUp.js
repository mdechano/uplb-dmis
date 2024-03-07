import {Link} from 'react-router-dom'
import '../css/SignUp.css'

function SignUp () {

    return (
        <form action="action_page.php" method="post">
                <div class="imgcontainer">
                    {/* <img src="img_avatar2.png" alt="Avatar" class="avatar"/> */}
                </div>
                <div class='login-text'>
                    Sign Up to UPLB DMIS
                </div>

                <div class="container-1">
                    <label for="uname"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="uname" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <label for="psw"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Re-enter Password" name="psw" required />
                    
                    <label for="rh"><b>Select Residence Hall</b></label>
                    <div className='res-halls'>
                        <div class="custom-select">
                        <select>
                            <option value="">Women's Residence Hall</option>
                            <option value="">Men's Residence Hall</option>
                            <option value="">International Residence Hall</option>
                            <option value="">VetMed Residence Hall</option>
                        </select>
                        </div>
                    </div>
                    

                    <button type="submit" class='loginbtn'><a><Link to='/dashboard'>Sign Up</Link></a></button>
                    <label>
                    <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                </div>

                <div class="container-2">
                    <span class="psw"><a><Link to='/login'>I already have an account.</Link></a></span>
                </div>
            </form>
    )
    

}

export default SignUp;