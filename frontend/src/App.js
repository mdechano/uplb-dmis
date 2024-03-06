import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'
import Dashboard from './components/pages/Dashboard'
import LoginPage from './components/pages/LoginPage'
import SignUp from './components/pages/SignUp'

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
