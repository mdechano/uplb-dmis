import {Link} from 'react-router-dom'
import '../css/StudentInfoSheet.css'
import NavBar from '../pages/NavBar';

function StudentInfoSheet () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
                Student Info Sheet.
            </div>
        </div>
    )

}

export default StudentInfoSheet;