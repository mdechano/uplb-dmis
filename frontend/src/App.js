import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'
import Dashboard from './components/pages/Dashboard'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact={true} path="/" element={<LandingPage />} />
            <Route exact={true} path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
