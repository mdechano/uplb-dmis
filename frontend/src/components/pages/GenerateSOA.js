import {Link, redirect} from 'react-router-dom';
import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from '../utilities/authHook';
import {apiUrl} from '../utilities/apiUrl';
import axios, { all } from "axios";
import {jsPDF} from "jspdf";
import {autoTable} from 'jspdf-autotable';
import '../css/NavBar.css';
import NavBar from './NavBar';
import '../css/GenerateSOA.css'

function GenerateSOA () {

    const navigate = useNavigate();
    const { user, isAuthenticated, setAuth } = useStore();     // from zustand store
    const [ currentResident, setResident] = useState();
    const [ dorm_fee, setDormFee ] = useState();
    const [ laptop_total, setLaptopTotal ] = useState();
    const [ gadgets_total, setGadgetsTotal ] = useState();
    const [ printer_total, setPrinterTotal ] = useState();
    const [ rice_cooker_total, setRiceCookerTotal ] = useState();
    const [ electric_fan_total, setFanTotal ] = useState();
    const [ refrigerator_total, setRefTotal ] = useState();
    const [ appliances_total, setAppliancesTotal ] = useState();
    const [ soa_total, setSoaTotal ] = useState();

    const [ months_covered, setMonthsCovered ] = useState();
    const [ semester, setSemester ] = useState();
    const [ date_generated, setDateGenerated ] = useState();

    const [ generate_flag, setGenerateFlag ] = useState(false);

    var account_name = "UPLB Trust Project Fund Housing Office";
    var account_number = "1891116760";   

    const fetchData = () => {
        const link = window.location.href;
        const id = link.slice(link.lastIndexOf('/')+1,link.length);
        const getResident = axios.get(apiUrl("/resident/") + id, { withCredentials: true });
            axios.all([getResident]).then(
                axios.spread((...allData) => {
                    const allResidentData = allData[0].data
                    setResident(allResidentData)
                })
            )  
    }

    const computeFees = (e) => {
        e.preventDefault();

        setGenerateFlag(true)

            var laptop_price = 62;
            var gadgets_price = 50;
            var printer_price = 42;
            var small_rice_cooker_price = 150;
            var big_rice_cooker_price = 200;
            var fan_8 = 57;
            var fan_10 = 76;
            var fan_12 = 95;
            var fan_14 = 114;
            var fan_16 = 152;
            var fan_18 = 228;
            var fan_20 = 333;
            var ref_4 = 428;
            var ref_5 = 490;
            var dorm_fee;
            var laptop_total;
            var gadgets_total;
            var printer_total;
            var rice_cooker_total;
            var electric_fan_total;
            var refrigerator_total;
            var appliance_fee;
            var soa_total;  
        
        if (currentResident !== undefined) {

            var multiplier = document.getElementById("no_months").value;
            setMonthsCovered(document.getElementById("months_covered").value)
            setDateGenerated(document.getElementById("date_generated").value)
            setSemester(document.getElementById("semester").value)
            
            // compute dorm fee
            if (currentResident.slas === 'FDS' || currentResident.slas === 'FD') {
                dorm_fee = 400 * multiplier;
            } else if (currentResident.slas === 'PD80') {
                dorm_fee = 500 * multiplier;
            } else {
                dorm_fee = 800 * multiplier;
            }
            console.log("dorm fee: " + dorm_fee)
            setDormFee(dorm_fee)

            // compute laptop total
            laptop_total = multiplier * currentResident.appliances.laptop * laptop_price
            console.log("laptop total: "+laptop_total)
            setLaptopTotal(laptop_total)

            // compute gadgets total
            gadgets_total = multiplier * currentResident.appliances.gadgets * gadgets_price
            console.log("gadgets total: "+gadgets_total)
            setGadgetsTotal(gadgets_total)

            // compute printer total
            printer_total = multiplier * currentResident.appliances.printer * printer_price
            console.log("printer total: "+printer_total)
            setPrinterTotal(printer_total)

            // compute rice cooker total
            if (currentResident.appliances.rice_cooker === 'small') {
                rice_cooker_total = multiplier * small_rice_cooker_price
                console.log("rice cooker total: "+rice_cooker_total)
                setRiceCookerTotal(rice_cooker_total)
            } else if (currentResident.appliances.rice_cooker === 'big') {
                rice_cooker_total = multiplier * big_rice_cooker_price
                console.log("rice cooker total: "+rice_cooker_total)
                setRiceCookerTotal(rice_cooker_total)
            } else {
                rice_cooker_total = multiplier * 0
                console.log("rice cooker total: "+rice_cooker_total)
                setRiceCookerTotal(rice_cooker_total)
            }

            // compute electric fan total
            if (currentResident.appliances.electric_fan === '8 inches') {
                electric_fan_total = multiplier * fan_8
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else if (currentResident.appliances.electric_fan === '10 inches') {
                electric_fan_total = multiplier * fan_10
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else if (currentResident.appliances.electric_fan === '12 inches') {
                electric_fan_total = multiplier * fan_12
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else if (currentResident.appliances.electric_fan === '14 inches') {
                electric_fan_total = multiplier * fan_14
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else if (currentResident.appliances.electric_fan === '16 inches') {
                electric_fan_total = multiplier * fan_16
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else if (currentResident.appliances.electric_fan === '18 inches') {
                electric_fan_total = multiplier * fan_18
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else if (currentResident.appliances.electric_fan === '20 inches') {
                electric_fan_total = multiplier * fan_20
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            } else {
                electric_fan_total = multiplier * 0
                console.log("fan total: "+electric_fan_total)
                setFanTotal(electric_fan_total)
            }

            // compute ref price
            if (currentResident.appliances.refrigerator === '4 cu. ft.') {
                refrigerator_total = multiplier * ref_4
                console.log("ref total: "+refrigerator_total)
                setRefTotal(refrigerator_total)
            } else if (currentResident.appliances.refrigerator === '5 cu. ft.') {
                refrigerator_total = multiplier * ref_5
                console.log("ref total: "+refrigerator_total)
                setRefTotal(refrigerator_total)
            } else {
                refrigerator_total = multiplier * 0
                console.log("ref total: "+refrigerator_total)
                setRefTotal(refrigerator_total)
            }

            // compute appliance fee
            appliance_fee = laptop_total + gadgets_total + printer_total + rice_cooker_total + electric_fan_total + refrigerator_total;
            console.log("appliance fee total: "+appliance_fee)
            setAppliancesTotal(appliance_fee)

            soa_total = dorm_fee + appliance_fee;
            console.log("soa total: "+soa_total)
            setSoaTotal(soa_total)

        }
    }
    
    const makePDF = () => {
        var document = new jsPDF();
        var title = `${currentResident.student_no} ${months_covered} SOA`;

        document.setFont("Courier");
        document.setFontSize(15);
        document.text("Statement of Account", 70, 15)

        document.setFont("Courier");
        document.setFontSize(12);

        

        document.autoTable({ html: '#upper-table' , startY: 20, useCss: true})
        document.autoTable({ html: '#appliances-table', useCss: true })

        document.text(`Statement of Account for ${semester}`, 15, 80)
        document.text(`Month/s Covered: ${months_covered}`, 15, 85)
        document.text(`Date generated: ${date_generated}`, 15, 90)

        document.autoTable({ html: '#soa', startY: 100, useCss: true})

        document.save(title)

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

            <div>
                <div>
                
                    <div className='upper-div'>
                        <button className='back-button' onClick = {()=> navigate("/dashboard")}>BACK</button>
                    </div>
                    <div className='title-bg'><p className='page-title'>GENERATE STATEMENT OF ACCOUNT</p></div>
                </div>
                <br></br>
                <div>
                    { currentResident !== undefined ?
                        <div className='generate-soa-div'>
                            <div className='soa-body'>
                                {/* <p className='upload-receipt-note'><i>blah blah blah</i></p>
                                <br></br> */}
                                <div className='generate-soa-form'>
                                    <table className='soa-table' id='upper-table'>
                                        <tr>
                                            <td><b>Account Name</b></td>
                                            <td>{account_name}</td>
                                            <td><b>Account Number</b></td>
                                            <td>{account_number}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Name</b></td>
                                            <td>{currentResident.first_name} {currentResident.last_name}</td>
                                            <td><b>Student Number</b></td>
                                            <td>{currentResident.student_no}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Dormitory</b></td>
                                            <td>{currentResident.dorm}</td>
                                            <td><b>SLAS</b></td>
                                            <td>{currentResident.slas}</td>
                                        </tr>
                                    </table>
                                    <br></br>
                                    <table className='soa-table' id='appliances-table'>
                                        <tr>
                                            <th colspan="6"><b>LIST OF APPLIANCES</b></th>
                                        </tr>
                                        <tr>
                                            <td><b>Laptop</b></td>
                                            <td>{currentResident.appliances.laptop}</td>
                                            <td><b>Printer</b></td>
                                            <td>{currentResident.appliances.printer}</td>
                                            <td><b>Electric Fan</b></td>
                                            <td>{currentResident.appliances.electric_fan}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Gadgets</b></td>
                                            <td>{currentResident.appliances.gadgets}</td>
                                            <td><b>Rice Cooker</b></td>
                                            <td>{currentResident.appliances.rice_cooker}</td>
                                            <td><b>Refrigerator</b></td>
                                            <td>{currentResident.appliances.refrigerator}</td>
                                        </tr>
                                    </table>
                                </div>
                                { generate_flag === false ?
                                
                                <form className='generate-soa-form'>
                                    
                                    <br></br>
                                    <table>
                                        <tr className='table-row'>
                                            <td className='cell-title'>Date Today</td>
                                            <td className='cell-title'>Semester</td>
                                            <td className='cell-title'>Number of Months Covered</td>
                                            <td className='cell-title'>Months Covered</td>
                                            <td className='cell-title'></td>
                                        </tr>
                                        <tr className='table-row'>
                                            <td className='cell-input'><input type="date" className='complete-input' id="date_generated" required></input></td>
                                            <td className='cell-input'>
                                                <select className='custom-select-semester' id="semester" required>
                                                <option>Select Semester</option>
                                                <option value="1st Semester">1st Sem</option>
                                                <option value="2nd Semester">2nd Sem</option>
                                                <option value="Midyear">Midyear</option>
                                                </select>
                                            </td>
                                            <td className='cell-input'><input type="number" className='complete-input' id="no_months" required></input></td>
                                            <td className='cell-input'><input type="text" className='complete-input' id="months_covered" placeholder='ex. January-March'></input></td>
                                            <td className='cell-title-display-violation'><button className='edit-violation-btn' onClick={computeFees}><b>COMPUTE</b></button></td>
                                        </tr>
                                    </table>
                                </form>

                                
                                : "" }
                                { generate_flag === true ?
                                    <div className='generate-soa-form'>
                                    <br></br>
                                    <p>Statement of Account for <b>{semester}</b> for the month/s: <b>{months_covered}</b>.</p>
                                    <p>Date generated: {date_generated}.</p>
                                    <br></br>
                                    <table className='soa-table' id='soa'>
                                        <tr>
                                            <th colspan='6'><b>SOA Computation</b></th>
                                        </tr>
                                        <tr>
                                            <td><b>Laptop</b></td>
                                            <td>{laptop_total}</td>
                                            <td><b>Printer</b></td>
                                            <td>{printer_total}</td>
                                            <td><b>Electric Fan</b></td>
                                            <td>{electric_fan_total}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Gadgets</b></td>
                                            <td>{gadgets_total}</td>
                                            <td><b>Rice Cooker</b></td>
                                            <td>{rice_cooker_total}</td>
                                            <td><b>Refrigerator</b></td>
                                            <td>{refrigerator_total}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Dorm Fee</b></td>
                                            <td><b>{dorm_fee}</b></td>
                                            <td><b>Total Appliance Fee</b></td>
                                            <td><b>{appliances_total}</b></td>
                                            <td><b>TOTAL</b></td>
                                            <td><b>{soa_total}</b></td>
                                        </tr>
                                    </table>
                                    <br></br>
                                    <div className='soa-btns'>
                                        <button className='edit-violation-btn' onClick={makePDF}>DOWNLOAD</button>
                                        <button className='delete-violation-btn' onClick={() => setGenerateFlag(false)}>CANCEL</button>
                                    </div>
                                    <br></br>
                                    </div>

                                : ""}    
                                
                            </div>
                        </div>
                    : ""}
                </div>
            </div>
        </div>
    )

}

export default GenerateSOA;