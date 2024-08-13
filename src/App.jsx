import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Box } from '@mui/material'
import Sidebar from './sidebar/Sidebar'
import Navbar from './shared/Navbar'
// import Footer from './shared/Footer'
import Login from './pages/Login/Login'
import { useEffect } from 'react';
import { auth } from './pages/Login/protected';
import ForgotPassword from './pages/Login/ForgotPassword';
import VerifyOtp from './pages/Login/VerifyOtp';
import ResetPassword from './pages/Login/ResetPassword';
import Category from './pages/Category';
import Home from './pages/Home';
import Brand from './pages/Brand';
import Shope from './pages/Shope';

function App() {
  useEffect(() => {
    let userLoggedIn = auth();
  
    if (userLoggedIn) {
      if (window.location.pathname === '/') {
        window.location.href = '/dashboard';
      }
    } else {
      if (!['/', '/forgot-password'].includes(window.location.pathname)) {
        window.location.href = '/';
      }
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/' element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Sidebar />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Box sx={{ padding: 1, flexGrow: 1 }}>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="shope" element={<Shope />} />
                    <Route path="categories" element={<Category />} />
                    <Route path="brands" element={<Brand />} />
                  </Routes>
                </Box>
                {/* <Footer /> */}
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  )
}

export default App