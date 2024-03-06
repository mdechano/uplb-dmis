import {Link} from 'react-router-dom'
import UPLBLogoText from '../images/UPLBLogoText.png'
import DDMenu from '../images/DDMenu.png'
import profilepic from '../images/userprofile.png'
import '../css/NavBar.css'

function NavBar () {

    return (
        <div>
            <header className='dashboard_header'>
                <div className='left-header'>
                    <img className='uplblogo' src={UPLBLogoText} alt='logo' />
                    <nav>
                        <ul className="dashboard-nav_links">
                            {/* <li><a>Home</a></li> */}
                            {/* <li><a>About</a></li>
                            <li><a>Contact</a></li> */}
                        </ul>
                    </nav>
                </div>
                
                <div className='profile-div'>
                    <a className='user-name'>USER&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <div className='dropdown'>
                        <img className="user-image" alt="profile" src={profilepic}/>
                        <div className='dropdown-content'>
                            <a href="#">Student Information Sheet</a>
                            <a href="#">Generate SOA</a>
                            <a href="#">Upload Receipt</a>
                            <a href="#">Dorm Information</a>
                        </div>
                    </div>
                    <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <button className='logoutbtn'><a><Link to="/">Logout</Link></a></button>
                </div>
                
            </header>
        </div>
    )

}

export default NavBar;