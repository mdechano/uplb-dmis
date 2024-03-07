import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetCheckIn.css'
import NavBar from './NavBar';

function StudentInfoSheetCheckIn () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
                Student Info Sheet Check in.
            </div>
        </div>
    )

}

export default StudentInfoSheetCheckIn;