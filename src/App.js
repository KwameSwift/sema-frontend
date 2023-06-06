import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Screens/Auth/Login';
import HomePage from './Screens/Home';
import SignupPage from './Screens/Auth/Signup';
import ForgotPasswordPage from './Screens/Auth/ForgotPassword';
import ResetPasswordPage from './Screens/Auth/ResetPassword';
import VerificationCode from './Screens/Auth/VerificationCode';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-code" element={<VerificationCode />} />
      </Routes>
    </>
  );
}

export default App;
