import { useState } from 'react'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './interview/pages/Home'
import Interview from './interview/pages/Interview'
import Landing from './pages/Landing'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'  
import InterviewDashboard from './pages/InterviewDashboard'

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/interview" element={<InterviewDashboard />} />
          <Route path="/interview/new" element={<Home />} />
          <Route path="/interview/:interviewId" element={<Interview />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
