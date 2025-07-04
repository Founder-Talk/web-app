import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/layout/LandingPage";
import LoginPage from "./components/common/auth/login/page";
import SignupPage from "./components/common/auth/signup/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
