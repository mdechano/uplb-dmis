import {Link} from 'react-router-dom';
import '../css/GenerateSOA.css'
import NavBar from '../pages/NavBar';

function GenerateSOA () {

    return (
        <div>
            <NavBar></NavBar>

            <div className='gen-soa-div'>
                <div className='upper-div'>
                    <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                </div>
                <div className='title-bg'><p className='page-title'>STATEMENTS OF ACCOUNT</p></div>
                <div className='gen-soa-content'>
                    <h3>NOTICE</h3>
                    <br></br>
                    <p>Statements of Account (SOA) will be generated by month. If you wish to pay in months or in full, you may download the SOAs of your desired months or all SOAs under your account.</p>
                    <br></br>
                    <table>
                        <tr>
                            <td>DORMER:&nbsp;</td>
                            <td>Anna Dela Cruz&nbsp;&nbsp;&nbsp;</td>
                            <td>STUDENT NUMBER:&nbsp;</td>
                            <td>2019-08206</td>
                        </tr>
                    </table>
                    <div className='soa-table'>
                        <table>
                            <tr>
                                <td>SEMESTER&nbsp;&nbsp;</td>
                                <td>MONTH&nbsp;&nbsp;</td>
                                <td>DORM FEE&nbsp;&nbsp;</td>
                                <td>APPLIANCE FEE&nbsp;&nbsp;</td>
                                <td>TOTAL</td>
                            </tr>
                            <tr>
                                <td>2nd</td>
                                <td>March</td>
                                <td>500</td>
                                <td>169</td>
                                <td>669</td>
                                <td>download</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GenerateSOA;