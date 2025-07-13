import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/layout/LandingPage";
import LoginPage from "./components/auth/login";
import SignupPage from "./components/auth/signup";
import MentorDashboard from './components/app/dashboard/MentorDashboard';
import MenteeDashboard from './components/app/dashboard/MenteeDashboard';
import PrivateRoute from "./components/auth/PrivateRoute";
import VerifyOTPPage from "./components/auth/OtpVerify";
import Chat from './components/Chat/page'
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/dashboard/mentor"
        element={
          <PrivateRoute>
            <MentorDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/dashboard/mentee"
        element={
          <PrivateRoute>
            <MenteeDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
