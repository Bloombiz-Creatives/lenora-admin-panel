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
import Attribute from './pages/Attribute';
import AttributeDetails from './attribute/AttributeDetails';
import Color from './pages/Color';
import Products from './pages/Products';

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
                    <Route path="attributes" element={<Attribute />} />
                    <Route path="attribute-details/:id" element={<AttributeDetails />} />
                    <Route path="colors" element={<Color />} />
                    <Route path="products" element={<Products/>} />



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