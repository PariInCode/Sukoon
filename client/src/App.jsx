import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AIChat from './pages/AIChat';
import Dashboard from './pages/Dashboard';
import Community from './pages/Coomunity';
import MoodTracker from './pages/MoodTracker';
import Profile from './pages/Profile';


function App() {
  return (
     <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
      <Footer />

    </>
  );
}

export default App;