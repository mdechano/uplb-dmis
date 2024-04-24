import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import CompleteResidentProfile from './components/pages/CompleteResidentProfile';
import CompleteManagerProfile from './components/pages/CompleteManagerProfile';
import CompleteAttendantProfile from './components/pages/CompleteAttendantProfile';
import ManagerProfile from './components/pages/ManagerProfile';
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
            <Route exact={true} path="/complete-resident-profile" element={<CompleteResidentProfile />} />
            <Route exact={true} path="complete-manager-profile" element={<CompleteManagerProfile />} />
            <Route exact={true} path="complete-attendant-profile" element={<CompleteAttendantProfile />} />
            <Route exact={true} path="manager-profile" element={<ManagerProfile />} />
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
