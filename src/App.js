import './css/header.css';
import './css/footer.css';
import './css/login.css';
import './css/acency-dangtin.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header-footer/Header';
import Header2 from './header-footer/Header2';
import Footer from './header-footer/Footer';
import Body1 from './components/Body1';
import Login from './components/Login';

import Home2 from './components/Home2';
import Home from './components/Home';

import AuthRoleFilter from './authentication/AuthRoleFilter';

function App() {
  const [setUserInfo] = useState(null);
  const handleLoginSuccess = (userLoginBasicInformationDto) => {
    // Callback function to update user information in App.js state
    setUserInfo(userLoginBasicInformationDto);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Header2 />
        <Routes>
          <Route path="/dangnhap" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/home2"
            element={
              <AuthRoleFilter>
                <Home2 />
              </AuthRoleFilter>
            }
          />
          <Route
            path="/home"
            element={
              <AuthRoleFilter>
                <Home />
              </AuthRoleFilter>
            }
          />

          <Route path="/" element={<Body1 />} />
          {/* Add more routes if needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;