import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Screens/Auth/Login";
import HomePage from "./Screens/Home";
import SignupPage from "./Screens/Auth/Signup";
import ForgotPasswordPage from "./Screens/Auth/ForgotPassword";
import ResetPasswordPage from "./Screens/Auth/ResetPassword";
import VerificationCode from "./Screens/Auth/VerificationCode";
import DashboardPage from "./Screens/Admin/Dashboard";
import BlogsPage from "./Screens/Admin/Blogs";
import AddBlogPage from "./Screens/Admin/Blogs/AddBlog";

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

        {/* Admin Dashboard */}
        <Route path="/dashboard" exact element={<DashboardPage />} />
        <Route path="/admin/blogs" exact element={<BlogsPage />} />
        <Route path="/admin/blogs/add" exact element={<AddBlogPage />} />
      </Routes>
    </>
  );
}

export default App;
