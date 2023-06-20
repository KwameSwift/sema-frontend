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
import ContentCreatorDashboardPage from "./Screens/ContentCreator/Dashboard";
import CreatorBlogs from "./Screens/ContentCreator/Blogs";
import AddCreatorBlogPage from "./Screens/ContentCreator/Blogs/addBlog";
import EditCreatorBlogPage from "./Screens/ContentCreator/Blogs/editBlog";
import UsersPage from "./Screens/Admin/Users";
import UserRolesPage from "./Screens/Admin/UserRoles";
import SinglePost from "./Screens/Feed/SingleFeed";
import EditAdminBlogPage from "./Screens/Admin/Blogs/editBlog";

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

        {/* Guest */}
        <Route path="/blog/:id" element={<SinglePost />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" exact element={<DashboardPage />} />
        <Route path="/admin/users" exact element={<UsersPage />} />
        <Route path="/admin/user-roles" exact element={<UserRolesPage />} />
        <Route path="/admin/blogs" exact element={<BlogsPage />} />
        <Route path="/admin/blogs/add" exact element={<AddBlogPage />} />
        <Route path="/admin/blogs/edit/:id" exact element={<EditAdminBlogPage />} />

        {/* Content Creator */}
        <Route path="/creator/dashboard" exact element={<ContentCreatorDashboardPage />} />
        <Route path="/creator/blogs" exact element={<CreatorBlogs />} />
        <Route path="/creator/blogs/add" exact element={<AddCreatorBlogPage />} />
        <Route path="/creator/blogs/edit/:id" exact element={<EditCreatorBlogPage />} />
      </Routes>
    </>
  );
}

export default App;
