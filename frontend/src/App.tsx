import React from 'react'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import TFARegister from './pages/TFARegister'

export default function App() {
  return (
    <BrowserRouter>
      <Register/>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/two-fa-register-page' element={<TFARegister/>}/>
      </Routes>
    </BrowserRouter>
  )
}
