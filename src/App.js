import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Screens/Auth/Login';
import HomePage from './Screens/Home';
import SignupPage from './Screens/Auth/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
