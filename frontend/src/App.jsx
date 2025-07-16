import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/page/LandingPage";
import LoginPage from "./features/auth/login";
import SignupPage from "./features/auth/signup";
import MentorDashboard from './features/mentor/MentorDashboard';
import MenteeDashboard from './features/mentee/MenteeDashboard';
import PrivateRoute from "./features/auth/PrivateRoute";
import VerifyOTPPage from "./features/auth/OtpVerify";
import Chat from './features/Chat/ChatWindow'
import AppInitializer from "./redux/reduxuser";
function App() {
  return (
    <>
      <AppInitializer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route>

        </Route>
        <Route
          path="/dashboard/mentor"
          element=
          {
            <PrivateRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/mentee"
          element={
            <PrivateRoute allowedRoles={['mentee']}>
              <MenteeDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
