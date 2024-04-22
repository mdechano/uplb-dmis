import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import '../css/UploadReceipt.css'
import NavBar from '../pages/NavBar';

function UploadReceipt () {

    const navigate = useNavigate();

    return (
        <div>
            <NavBar></NavBar>

            <div className='upload-receipt-div'>
            <   div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                </div>
                <div className='title-bg'><p className='page-title'>PAYMENT RECEIPTS</p></div>
                <form action method="post">
    
                    <h1><strong>File upload</strong> with style and pure CSS</h1>
                    
                    <div class="form-group">
                        <label for="title">Title <span>Use title case to get a better result</span></label>
                        <input type="text" name="title" id="title" class="form-controll"/>
                    </div>
                    <div class="form-group">
                        <label for="caption">Caption <span>This caption should be descriptiv</span></label>
                        <input type="text" name="caption" id="caption" class="form-controll"/>
                    </div>
                    
                    <div class="form-group file-area">
                            <label for="images">Images <span>Your images should be at least 400x300 wide</span></label>
                        <input type="file" name="images" id="images" required="required" multiple="multiple"/>
                        <div class="file-dummy">
                        <div class="success">Great, your files are selected. Keep on.</div>
                        <div class="default">Please select some files</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="submit">Upload images</button>
                    </div>
                
                </form>
            </div>
        </div>
    )

}

export default UploadReceipt;