// This JavaScript file serves as the landing page component of UPLB DMIS
import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import '../css/LandingPage.css'

function LandingPage () {

    const navigate = useNavigate();
    const { setAuth } = useStore();

    // functions here
    function sendToken(token){
        fetch((apiUrl("/user/")), {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
            }),

        })
        .then((response) => response.json())
        .then((data) => {
            if(data.success === true){
                navigate("/dashboard");
            }
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }


    function handleCallbackResponse(response){
        sendToken(response.credential)
    }
    
    
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "327180859592-at6bmbl9oqfl8l3q0s1po5krah2ftoug.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
    
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
        //   { theme: "outline", size: "large"}
          {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark'
            // 'onsuccess': onSuccess,
            // 'onfailure': onFailure
          }
        )
    }, []);

    useEffect(()=>{
        fetch((apiUrl("/user/check-if-logged-in")), {
            method: "GET",
            credentials:'include',
            withCredentials: true,
            headers:{
                'Content-Type':'application/json'
            },
        }).then(response => {return response.json()})
        .then((data)=> {
            console.log(data.User);
            console.log(data.status);
            setAuth(data.User, data.status);
            if(data.status === true){
                navigate("/dashboard")
            }
        })
    },[]);

    return (
        <div>
            {/* <header className='landing_header'>
                <div className='uplb-dmis'>
                    <p>UPLB DMIS</p>
                </div>
                <nav className='landing-nav'>
                    <ul className="landing-nav_links">
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </nav>
            </header> */}
            <div className="landing_container">
                <div className="landing-left">
                    <p className='p_landing_title'>Welcome to the UPLB<br></br>Dormitory Management<br></br>Information System</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className='login-button' id='signInDiv'></button>        
                </div>
                <div className='landing-right'>
                    hello
                </div>
            </div>
        </div>
    )

}

export default LandingPage;
