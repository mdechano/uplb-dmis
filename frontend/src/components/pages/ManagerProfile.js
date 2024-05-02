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
    const [ currentUser, setUser] = useState();
    const [tempManager, setTempManager] = useState();
    const [ currentManager, setManager] = useState();

    // const fetchData = () => {
        
    //     const getTempManagers = axios.get(apiUrl("/manager"), { withCredentials: true });
    //     axios.all([getTempManagers]).then(
    //         axios.spread((...allData) => {
    //             setTempManager(allData[0].data)
    //             matchUser(tempManager)
    //         })
    //     )
    // }

    // const matchUser = (tempManager) => {
    //     if (tempManager !== undefined) {

    //         tempManager.map((tempManager, i) => {
    //             if (user._id === tempManager.user_id) {

    //                 const currentManager = tempManager;

    //                 const getManager = axios.get(apiUrl("/manager/") + currentManager._id, { withCredentials: true });
    //                 axios.all([getManager]).then(
    //                     axios.spread((...allData) => {
    //                         const allManagerData = allData[0].data
    //                         setManager(allManagerData)
    //                         // var picture_id = allData[0].data.picture_id.split(".")[0]
    //                         // fetch(apiUrl("/picture/" + picture_id), {
    //                         //     method: "GET",
    //                         // }).then((response) => response.json())
    //                     })
    //                 )
    //             }
    //         })
    //     }
    // }

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getManager = axios.get(apiUrl("/manager/") + id, { withCredentials: true });
        axios.all([getManager]).then(
            axios.spread((...allData) => {
                const allManagerData = allData[0].data
                setManager(allManagerData)
                console.log(currentManager)
                var pictureID = allData[0].data.picture_id.split(".")[0]
                fetch(apiUrl("/picture/" + pictureID), {
                    method: "GET",
                }).then((response) => response.json())
            })
        )
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
                        <button className='back-button' onClick = {()=> navigate('../dashboard', { replace: true })}>BACK</button>
                        
                    </div>
                    
                    <p className='page-title'>MANAGER PROFILE</p>

                    <div>
                        <button className='edit-profile-button'>EDIT PROFILE</button>
                    </div>
                </div>

                
                { currentManager !== undefined ?
                    <div className='body-div'>
                        <div className='manager-profile-div-left'>
                            {currentManager.first_name}
                        </div>
                        
                    </div>

                : 
                // fetchData()
                "hello"
                }
                
                                    
                
            </div>

        </div>
    )

}

export default ManagerProfile;