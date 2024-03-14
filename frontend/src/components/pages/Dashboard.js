import {Link, Redirect, Navigate} from 'react-router-dom'
import '../css/Dashboard.css'
import NavBar from '../pages/NavBar';
import Cookies from "universal-cookie";
import { Component } from 'react';

export default class Dashboard extends Component {

    //functions here

    constructor(props) {
        super(props);

        this.state = {
            checkedIfLoggedIn: false,
            isLoggedIn: null,
            email: localStorage.getItem("email")
        }
    }

    componentDidMount() {
        // send POST request to check if user is logged in

        fetch(
            "http://localhost:3001/checkifloggedin",
            {
                method: "POST",
                credentials: "include"
            }
        )
        .then(response => response.json())
        .then(body => {
            if (body.isLoggedIn) {
                this.setState({checkedIfLoggedIn: true, isLoggedIn: true, email: localStorage.getItem("email")})
            } else {
                this.setState({checkedIfLoggedIn: true, isLoggedIn: false});
            }
        });
    }


    render () {
        if (!this.state.checkedIfLoggedIn) {
            return(
                <div></div>
            )
        } else {
            if (this.state.isLoggedIn) {
                //render the page
                return (
                    <div>
                        <NavBar></NavBar>

                        <div className='dashboard-notice'>
                            <p className='greet'><b>Greetings, resident!</b></p>
                            <br></br>
                            <br></br>
                            <p>Welcome to  UPLB DMIS.  We are pleased to welcome you to ___ Resident Hall. You are required to fill up or update the student  information sheet as mandated on or before your check in date. You may also generate your statements of account in the SOA section. Payment receipts must be uploaded in the Receipt section. Please see said sections under your profile icon.<br></br><br></br>All information are subject to viewing and checking of the dorm manager and dorm assistants.</p>
                        </div>

                    </div>
                )
            }
            else {
                // redirect
                return <Navigate to="/" />
            }
        }
        
    }
    
}

// export default Dashboard;