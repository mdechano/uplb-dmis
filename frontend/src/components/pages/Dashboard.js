import {Link} from 'react-router-dom'
import '../css/Dashboard.css'
import UPLBLogoText from '../images/UPLBLogoText.png'
import DDMenu from '../images/DDMenu.png'

function Dashboard () {

    //functions here

    return (
        <div>
            <header className='dashboard_header'>
                <div className='left-header'>
                    <div className='dropdown'>
                        <img className='menu' src={DDMenu} alt='menu'/>
                        <div className='dropdown-content'>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    

                    <img className='uplblogo' src={UPLBLogoText} alt='logo' />
                </div>
                <nav>
                    <ul className="dashboard-nav_links">
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </nav>
                <button className='logoutbtn'>Logout</button>
            </header>
        </div>
    )
}

export default Dashboard;