import {Link, useNavigate} from 'react-router-dom';
import '../css/LoginPage.css'
import { useEffect} from "react";
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import Cookies from 'universal-cookie';

function LoginPage () {

    const navigate = useNavigate();
    const {user, isAuthenticated, setAuth} = useStore();

    function login(e){
        e.preventDefault();

        const credentials = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        fetch((apiUrl("/user/")), {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),

        })
        .then((response) => response.json())
        .then((body) => {
            if(body.success === true){

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
                navigate("/dashboard");
            }
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    useEffect(()=> {
        fetch((apiUrl("/user/check-if-logged-in")), {
            method: "POST",
            credentials:'include',
            withCredentials: true,
            headers:{
                'Content-Type':'application/json'
            },
        }).then(response => {return response.json()})
        .then((body)=> {
            setAuth(body.User, body.status);
            if(body.isLoggedIn === true){
                navigate("/dashboard")
            }
        })
    },[]);




    // render() {
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
                        <button id="login" onClick={login}>Login</button>
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
    // }

}

export default LoginPage;