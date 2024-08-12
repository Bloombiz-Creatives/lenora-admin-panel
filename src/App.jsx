import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Box } from '@mui/material'
import Sidebar from './sidebar/Sidebar'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Login from './pages/Login/Login'
function App() {

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
