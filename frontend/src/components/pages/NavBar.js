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
                            <a><Link to='/resident-profile'>Resident Profile</Link></a>
                            <a><Link to='/student-info-sheet-personal'>Student Information Sheet</Link></a>
                            <a><Link to='/generate-soa'>Generate SOA</Link></a>
                            <a><Link to='/upload-receipt'>Upload Receipt</Link></a>
                            <a><Link to='/dorm-information'>Dorm Information</Link></a>
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