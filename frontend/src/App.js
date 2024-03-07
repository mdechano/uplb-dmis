import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'
import Dashboard from './components/pages/Dashboard'
import LoginPage from './components/pages/LoginPage'
import SignUp from './components/pages/SignUp'
import ResidentProfile from './components/pages/ResidentProfile';
import StudentInfoSheetCheckIn from './components/pages/StudentInfoSheetCheckIn';
import StudentInfoSheetEmergency from './components/pages/StudentInfoSheetEmergency';
import StudentInfoSheetFamily from './components/pages/StudentInfoSheetFamily';
import StudentInfoSheetPayment from './components/pages/StudentInfoSheetPayment';
import StudentInfoSheetPersonal from './components/pages/StudentInfoSheetPersonal';
import StudentInfoSheetViolation from './components/pages/StudentInfoSheetViolation';
import GenerateSOA from './components/pages/GenerateSOA';
import UploadReceipt from './components/pages/UploadReceipt';
import DormInformation from './components/pages/DormInformation';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact={true} path="/" element={<LandingPage />} />
            <Route exact={true} path="/dashboard" element={<Dashboard />} />
            <Route exact={true} path="/login" element={<LoginPage />} />
            <Route exact={true} path="/signup" element={<SignUp />} />
            <Route exact={true} path="/resident-profile" element={<ResidentProfile />} />
            <Route exact={true} path="/student-info-sheet-check-in" element={<StudentInfoSheetCheckIn />} />
            <Route exact={true} path="/student-info-sheet-emergency" element={<StudentInfoSheetEmergency />} />
            <Route exact={true} path="/student-info-sheet-family" element={<StudentInfoSheetFamily />} />
            <Route exact={true} path="/student-info-sheet-payment" element={<StudentInfoSheetPayment />} />
            <Route exact={true} path="/student-info-sheet-personal" element={<StudentInfoSheetPersonal />} />
            <Route exact={true} path="/student-info-sheet-violation" element={<StudentInfoSheetViolation />} />
            <Route exact={true} path="/generate-soa" element={<GenerateSOA />} />
            <Route exact={true} path="/upload-receipt" element={<UploadReceipt />} />
            <Route exact={true} path="/dorm-information" element={<DormInformation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
