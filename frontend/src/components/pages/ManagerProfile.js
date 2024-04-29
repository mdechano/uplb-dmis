import {Link} from 'react-router-dom'
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import '../css/NavBar.css'
import NavBar from './NavBar';
import '../css/ManagerProfile.css';

function ManagerProfile () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [tempManager, setTempManager] = useState();
    const [manager, setManager] = useState();

    const fetchData = () => {
        const getTempManagers = axios.get(apiUrl("/manager"), { withCredentials: true });
        axios.all([getTempManagers]).then(
            axios.spread((...allData) => {
                setTempManager(allData[0].data)
                matchUser(tempManager)
            })
        )
    }

    const matchUser = (tempManager) => {
        if (tempManager !== undefined) {
            tempManager.map((tempManager, i) => {
                if (user._id === tempManager.user_id) {

                    const currentManager = tempManager;

                    console.log("current manager: " + currentManager.first_name)
                    console.log("current manager user_id: " + currentManager.user_id)
                    console.log("current user._id: " + user._id)

                    const getManager = axios.get(apiUrl("/manager/") + currentManager._id, { withCredentials: true });
                    axios.all([getManager]).then(
                        axios.spread((...allData) => {
                            const allManagerData = allData[0].data
                            setManager(allManagerData)
                            var picture_id = allData[0].data.picture_id.split(".")[0]
                            fetch(apiUrl("/picture/" + picture_id), {
                                method: "GET",
                            }).then((response) => response.json())
                        })
                    )
                }
            })
        }
    }

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/")
        } 
        else {
            fetchData()
        }
    },[]);

    return (
        <div>
            <NavBar></NavBar>

            <div className='manager-profile-div'>

                <div className='upper-div'>
                    <div>
                        <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                        { user.completed_profile === false ?
                        <button className='complete-profile-button' onClick={() => navigate("/complete-manager-profile")}>COMPLETE PROFILE</button>
                        : ""}
                    </div>
                    
                    <p className='page-title'>MANAGER PROFILE</p>

                    <div>
                        <button className='edit-profile-button'>EDIT PROFILE</button>
                    </div>
                </div>

                
                { manager !== undefined ?
                    <div className='body-div'>
                        <div className='manager-profile-div-left'>
                            <p>{manager.first_name}</p>
                            <br></br>
                            <p>{manager.last_name}</p>
                            <br></br>
                            <p>{manager.user_id}</p>
                            <br></br>
                            <p>{user._id}</p>
                            <br></br>
                            <img className="donorpic" src={require(`../pictures/${manager.picture_id}`)} />
                            </div>

                        <div className='manager-profile-div-right'>
                            hello right
                        </div>
                    </div>

                : " "}
                
                                    
                
            </div>

        </div>
    )

}

export default ManagerProfile;