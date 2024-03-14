import {Link, Routes, Router, useNavigate} from 'react-router-dom';
import '../css/LoginPage.css'
import React, {Component} from "react";
import Cookies from "universal-cookie";
import { Navigate, Route} from 'react-router';

export default class LoginPage extends Component  {

    constructor(props) {
        super(props);

        // this.state = {
        //     success: false
        // };

        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();

        const credentials = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        // const navigate = useNavigate();

        // send a POST request
        fetch(
            "http://localhost:3001/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            }
        )
        .then(response => response.json())
        .then(body => {
            if (!body.success) {
                alert("Failed to log in!");
            }
            else {
                // successful log in, store token as cookie
            
                const cookies = new Cookies();
                cookies.set(
                    "authToken",
                    body.token,
                    {
                        path: "localhost:3001/",
                        age: 60*60,
                        sameSite: "lax"
                    }
                );

                localStorage.setItem("email", body.email);
                alert("Successfully logged in!");
                // navigate('/dashboard');
                // this.setState({success:true});

                
                
                
            }
        })

        // if(this.setState({success:true})) {
        //     <Navigate to='/dashboard' />
        // }
    }



    render() {
        return (
            <div className='form-div'>
                <form action="action_page.php" method="post">
                    <div class="imgcontainer">
                        {/* <img src="img_avatar2.png" alt="Avatar" class="avatar"/> */}
                    </div>
                    <div class='login-text'>
                        Login to UPLB DMIS
                    </div>

                    <div class="container-1">
                        <label for="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" required />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" id="password" required />

                        {/* <button type="submit" class='loginbtn'><a><Link to='/dashboard'>Login</Link></a></button> */}
                        <button id="login" onClick={this.login}>Login</button>
                        <label>
                        <input type="checkbox" checked="checked" name="remember"/> Remember me
                        </label>
                    </div>

                    <div class="container-2">
                        <span class="psw"><a><Link to='/signup'>Don't have an account?</Link></a></span>
                    </div>
                </form>

            
            </div>

            

        )
    }

}

// export default LoginPage;