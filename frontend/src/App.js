import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import CompleteResidentProfile from './components/pages/CompleteResidentProfile';
import CompleteManagerProfile from './components/pages/CompleteManagerProfile';
import CompleteAttendantProfile from './components/pages/CompleteAttendantProfile';
import AttendantProfile from './components/pages/AttendantProfile';
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
import EditDormInformation from './components/pages/EditDormInformation';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact={true} path="/" element={<LandingPage />} />
            <Route exact={true} path="/dashboard" element={<Dashboard />} />
            <Route exact={true} path="/complete-resident-profile" element={<CompleteResidentProfile />} />
            <Route exact={true} path="/complete-manager-profile" element={<CompleteManagerProfile />} />
            <Route exact={true} path="/complete-attendant-profile" element={<CompleteAttendantProfile />} />
            <Route exact={true} path="/manager/:id" element={<ManagerProfile />} />
            <Route exact={true} path="/attendant/:id" element={<AttendantProfile />} />
            <Route exact={true} path="/resident-check-in/:id" element={<StudentInfoSheetCheckIn />} />
            <Route exact={true} path="/resident-emergency/:id" element={<StudentInfoSheetEmergency />} />
            <Route exact={true} path="/resident-family/:id" element={<StudentInfoSheetFamily />} />
            <Route exact={true} path="/resident-payment/:id" element={<StudentInfoSheetPayment />} />
            <Route exact={true} path="/resident-personal/:id" element={<StudentInfoSheetPersonal />} />
            <Route exact={true} path="/resident-violation/:id" element={<StudentInfoSheetViolation />} />
            <Route exact={true} path="/generate-soa" element={<GenerateSOA />} />
            <Route exact={true} path="/upload-receipt" element={<UploadReceipt />} />
            <Route exact={true} path="/dorm-information" element={<DormInformation />} />
            <Route exact={true} path="/edit-dorm-information" element={<EditDormInformation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
