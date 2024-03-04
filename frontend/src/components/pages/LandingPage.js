// This JavaScript file serves as the landing page component of UPLB DMIS

import {Link} from 'react-router-dom'
import '../css/LandingPage.css'

function LandingPage () {

    // functions here

    return (
        <div>
            <header className='landing_header'>
                    <nav>
                        <ul className="landing-nav_links">
                            <li><a>Home</a></li>
                            <li><a>About</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </nav>
            </header>
            <div className="landing_container">
                <div className="landing_container_title">
                    <p className='p_landing_title'>Welcome to the UPLB<br></br>Dormitory Management<br></br>Information System</p>
                    <button className='login-button'><a><Link to="/dashboard">Login</Link></a></button>                
                </div>
            </div>
        </div>
    )

}

export default LandingPage;
