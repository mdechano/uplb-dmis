import React, {Component} from "react";
import {Link} from 'react-router-dom'
import '../css/SignUp.css'

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.signup = this.signup.bind(this);
    }

    signup(e) {
        e.preventDefault();

        const user= {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            resident_hall: document.getElementById("resident_hall").value
        }

        fetch(
            "http://localhost:3001/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(body => {
                if (body.success) { alert("Successfully save user"); }
                else { alert("Failed to save user"); }
            });
    }
    render() {

    
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
                    <input type="text" placeholder="Enter Email" id="email" name="email" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" id="password" name="password" required />
{/* 
                    <label for="psw"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Re-enter Password" name="psw" required /> */}
                    
                    <label for="rh"><b>Select Residence Hall</b></label>
                    <div className='res-halls'>
                        <div class="custom-select">
                        <select id="resident_hall">
                            <option value="Women's Residence Hall">Women's Residence Hall</option>
                            <option value="Men's Residence Hall">Men's Residence Hall</option>
                            <option value="International House Residence Hall">International House Residence Hall</option>
                            <option value="VetMed Residence Hall">VetMed Residence Hall</option>
                            <option value="Makiling Residence Hall">Makiling Residence Hall</option>
                            <option value="ATI-NTC Residence Hall">ATI-NTC Residence Hall</option>
                            <option value="Forestry Residence Hall">Forestry Residence Hall</option>
                            <option value="New Forestry Residence Hall">New Forestry Residence Hall</option>
                            <option value="New Dormitory Residence Hall">New Dormitory Residence Hall</option>
                        </select>
                        </div>
                    </div>
                    

                    <button type="submit" class='loginbtn' id='signup' onClick={this.signup}>Sign Up</button>
                    {/* <button type="submit" class='loginbtn'><a><Link to='/dashboard'>Sign Up</Link></a></button> */}
                    <label>
                    <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                </div>

                <div class="container-2">
                    <span><a><Link to='/login'>I already have an account.</Link></a></span>
                </div>
            </form>
    )
    }

}

// export default SignUp;