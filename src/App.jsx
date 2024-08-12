import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Box } from '@mui/material'
import Sidebar from './sidebar/Sidebar'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Login from './pages/Login/Login'
import { useEffect } from 'react';
import { auth } from './pages/Login/protected';

function App() {

  useEffect(() => {
    let userLoggedIn = auth()

    if (userLoggedIn) {
      if (window.location.pathname === '/') {
        window.location.href = '/dashboard'
      }
    } else {
      // if (window.location.pathname !== '/login') {
      //   window.location.href = '/login'
      // }
      if (!['/login', '/forgot-password'].includes(window.location.pathname)) {
        window.location.href = '/login'
      }
    }

  }, [])
  return (
    <Router>
      <Routes>
      <Route path='/' exact element={<Login/>} />
      <Route
          path="/dashboard/*"
          element={
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Sidebar/>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Navbar/>
                <Box sx={{ padding: 1 }}>
                  <Routes>
                  <Route path="/" element={<Footer />} />
                  {/* <Route path="/category" element={<Footer />} />
                  <Route path="/brand" element={<Footer />} /> */}

                  </Routes>
                </Box>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
