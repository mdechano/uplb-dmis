import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import CompleteResidentProfile from './components/pages/CompleteResidentProfile';
import CompleteManagerProfile from './components/pages/CompleteManagerProfile';
import CompleteAttendantProfile from './components/pages/CompleteAttendantProfile';
import AttendantProfile from './components/pages/AttendantProfile';
import ManagerProfile from './components/pages/ManagerProfile';
import EditManagerProfile from './components/pages/EditManagerProfile';
import EditAttendantProfile from './components/pages/EditAttendantProfile';
import StudentInfoSheetCheckIn from './components/pages/StudentInfoSheetCheckIn';
import EditStudentCheckIn from './components/pages/EditStudentCheckIn';
import StudentInfoSheetPayment from './components/pages/StudentInfoSheetPayment';
import EditStudentPayment from './components/pages/EditStudentPayment';
import StudentInfoSheetPersonal from './components/pages/StudentInfoSheetPersonal';
import EditStudentPersonal from './components/pages/EditStudentPersonal';
import StudentInfoSheetViolation from './components/pages/StudentInfoSheetViolation';
import EditStudentViolation from './components/pages/EditStudentViolation';
import GenerateSOA from './components/pages/GenerateSOA';
import UploadReceipt from './components/pages/UploadReceipt';
import DormInformation from './components/pages/DormInformation';
import EditDormInformation from './components/pages/EditDormInformation';
import ResidentsList from './components/pages/ResidentsList';

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
            <Route exact={true} path="/edit-manager/:id" element={<EditManagerProfile />} />
            <Route exact={true} path="/attendant/:id" element={<AttendantProfile />} />
            <Route exact={true} path="/edit-attendant/:id" element={<EditAttendantProfile />} />
            <Route exact={true} path="/resident-check-in/:id" element={<StudentInfoSheetCheckIn />} />
            <Route exact={true} path="/resident-payment/:id" element={<StudentInfoSheetPayment />} />
            <Route exact={true} path="/resident-personal/:id" element={<StudentInfoSheetPersonal />} />
            <Route exact={true} path="/resident-violation/:id" element={<StudentInfoSheetViolation />} />
            <Route exact={true} path="/edit-resident-check-in/:id" element={<EditStudentCheckIn />} />
            <Route exact={true} path="/edit-resident-payment/:id" element={<EditStudentPayment />} />
            <Route exact={true} path="/edit-resident-personal/:id" element={<EditStudentPersonal />} />
            <Route exact={true} path="/editresident-violation/:id" element={<EditStudentViolation />} />
            <Route exact={true} path="/generate-soa" element={<GenerateSOA />} />
            <Route exact={true} path="/upload-receipt" element={<UploadReceipt />} />
            <Route exact={true} path="/dorm-information" element={<DormInformation />} />
            <Route exact={true} path="/edit-dorm-information" element={<EditDormInformation />} />
            <Route exact={true} path="/residents-list" element={<ResidentsList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
