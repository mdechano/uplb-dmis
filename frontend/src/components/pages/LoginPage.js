import {Link} from 'react-router-dom'
import '../css/LoginPage.css'

function LoginPage () {

    return (
        // <div className='form-div'>
            <form action="action_page.php" method="post">
                <div class="imgcontainer">
                    {/* <img src="img_avatar2.png" alt="Avatar" class="avatar"/> */}
                </div>
                <div class='login-text'>
                    Login to UPLB DMIS
                </div>

                <div class="container-1">
                    <label for="uname"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="uname" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <button type="submit" class='loginbtn'><a><Link to='/dashboard'>Login</Link></a></button>
                    <label>
                    <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                </div>

                <div class="container-2">
                    <span class="psw"><a><Link to='/signup'>Don't have an account?</Link></a></span>
                </div>
            </form>
        // </div>
    )

}

export default LoginPage;