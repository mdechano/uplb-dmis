import {React, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {apiUrl} from '../utilities/apiUrl';
import useStore from '../utilities/authHook';
import axios, { all } from "axios";
import '../css/UploadReceipt.css';
import NavBar from './NavBar';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";

function UploadReceipt () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ resident, setResident ] = useState();
    const [file, setfile] = useState(); 


    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
        axios.all([getResident]).then(
            axios.spread((...allData) => {
                setResident(allData[0].data)
            })
        )
    }

    const handleFileSelected = (e) => {
        // supabase assignment
        setfile(e.target.files[0]);
        console.log(file)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

                // upload pdf
                const filename = `${uuidv4()}-${file.name}`;
                console.log(filename)
                const { data, error } = await supabase.storage.from("receipts").upload(filename, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

                // get generated data path
                const filepath = data.path;
                // get and save public URL in final_pdf
                const { data: pdf } = supabase.storage.from('receipts').getPublicUrl(`${filepath}`);

                fetch(apiUrl("/receipt"),{
                    method: "POST",
                    credentials:'include',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        date_posted: document.getElementById("date_posted").value,
                        academic_year: document.getElementById("academic_year").value,
                        semester: document.getElementById("semester").value,
                        months_covered: document.getElementById("months").value,
                        resident_id: resident._id,
                        pdf_url: pdf.publicUrl
                    })
                })
                .then(response => {return response.json()})
                .then(alert("Successfully uploaded receipt."), navigate('/resident-receipts/'+resident._id))
           
    };

    
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
            <div>
                <div>
                    <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button> 
                    </div>
                    <div className='title-bg'><p className='page-title'>UPLOAD RECEIPT</p></div>
                    
                </div>
                { resident !== undefined ?
                <div  className='upload-receipt-div'>
                     <div className='upload-body'>
                     <p className='upload-receipt-note'><i>Kindly upload your payment receipts in PDF format. You may view, edit, or delete your uploaded receipts at the <b>Uploaded Receipts</b> section of your student information sheet.</i></p>
                     <br></br>
                        <form className='upload-receipt-form' >
                            <table >
                                    <tr className='table-row'>
                                        <td className='cell-title'>Date Today</td>
                                        <td className='cell-title'>Academic Year</td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-input'><input type="date" className='complete-input' id="date_posted" required></input></td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="academic_year" ></input></td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td className='cell-title'>Semester</td>
                                        <td className='cell-title'>Months Covered of Payment</td>
                                    </tr>
                                    <tr className='table-row'>
                                    <td className='cell-input'>
                                            <select className='custom-select-sex' id="semester" required>
                                                <option>Select Semester</option>
                                                <option value="1st Semester">1st Sem</option>
                                                <option value="2nd Semester">2nd Sem</option>
                                                <option value="Midyear">Midyear</option>
                                            </select>
                                        </td>
                                        <td className='cell-input'><input type="text" className='complete-input' id="months" ></input></td>
                                        
                                    </tr>
                            </table>
                            <br></br>
                            <div className='upload-file-container'>
                            <input className='pdf-file-upload'  type="file" accept="application/pdf" onChange={handleFileSelected}></input>
                            </div>
                            <br></br>
                            <button className='upload-pdf-submit' id='submit-btn' type="submit" onClick={handleSubmit}>UPLOAD RECEIPT</button>
                        </form>
                        <br></br>
                        <br></br>
                    </div>
                    
                </div>
                : ""}
                
               
            </div>
        </div>
    )

}

export default UploadReceipt;