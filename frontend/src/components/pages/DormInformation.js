import {Link} from 'react-router-dom'
import '../css/DormInformation.css'
import NavBar from '../pages/NavBar';

function DormInformation () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='dorm-info-div'>
                <div className='upper-div'>
                    <button className='back-button'>BACK</button>
                </div>
                <div className='title-bg'><p className='page-title'>DORM INFORMATION</p></div>
                <div className='dorm-info-content'>
                    
                    <h3>DORM NAME HERE</h3>
                    <br></br>
                    <table>
                        <tr>
                            <td><th>Dorm Manager</th></td>
                            <td>Manger Name Here</td>
                            <td><th>Dorm Attendant</th></td>
                            <td>Attendant Name Here</td>
                        </tr>
                        <tr>
                            <td><th>Email</th></td>
                            <td>Manager Email Here</td>
                            <td><th>Email</th></td>
                            <td>Attendant Email Here</td>
                        </tr>
                        <tr>
                            <td><th>Contact Number</th></td>
                            <td>Manager Contact Number Here</td>
                            <td><th>Contact Number</th></td>
                            <td>Attendant Contact Number Here</td>
                        </tr>

                        <br></br>

                        <h4>Housekeeping</h4>
                        <tr>
                            <td>Unit 1</td>
                            <td>Unit 2</td>
                            <td>Unit 3</td>
                            <td>Unit 4</td>
                        </tr>
                        <tr>
                            <td>NAME</td>
                            <td>NAME</td>
                            <td>NAME</td>
                            <td>NAME</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default DormInformation;