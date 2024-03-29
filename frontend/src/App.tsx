import React from 'react'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import TFARegister from './pages/TFARegister'
import { AuthProvider } from './context/AuthProvider'
import Login from './pages/Login.tsx'
import TFAVerify from './pages/TFAVerify.tsx'
import Welcome from './pages/Welcome.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/two-fa-register-page' element={<TFARegister/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/two-fa-verify-page' element={<TFAVerify/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
      </Routes>
    </BrowserRouter>
  )
}
