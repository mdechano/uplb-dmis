import {Link} from 'react-router-dom'
import '../css/StudentInfoSheetPersonal.css'
import NavBar from './NavBar';

function StudentInfoSheetPersonal () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='stud-info-sheet-div'>
                <div className='upper-div'>
                    <button className='back-button'>BACK</button>
                    <p className='page-title'>STUDENT INFORMATION SHEET</p>
                    <button className='save-button'>SAVE</button>
                </div>
                <div className='body-div'>
                    <div className='left-div'>
                        <div className='student-div'>
                            <div className='image-div'>
                                image here
                            </div>
                            <div className='profile-info'>
                                <p>ANNA DELA CRUZ</p>
                                <p>2019-08206</p>
                                <p>ROOM NO. 1209</p>
                            </div>
                        </div>
                        <div className='nav-div'>
                            <button className='stud-info-sheet-nav-personal'>PERSONAL</button>
                            <button className='stud-info-sheet-nav'>FAMILY</button>
                            <button className='stud-info-sheet-nav'>CHECK IN</button>
                            <button className='stud-info-sheet-nav'>EMERGENCY</button>
                            <button className='stud-info-sheet-nav'>PAYMENT</button>
                            <button className='stud-info-sheet-nav'>VIOLATION</button>
                        </div>
                    </div>
                    <div className='right-div'>
                        ISANG MALAKING FORM
                    </div>
                </div>
                
            </div>
        </div>
    )

}

export default StudentInfoSheetPersonal;