import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact={true} path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
