import {Link} from 'react-router-dom'
import '../css/UploadReceipt.css'
import NavBar from '../pages/NavBar';

function UploadReceipt () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='upload-receipt-div'>
                Upload receipt.
            </div>
        </div>
    )

}

export default UploadReceipt;