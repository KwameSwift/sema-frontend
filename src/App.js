import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Screens/Auth/Login";
import HomePage from "./Screens/Home";
import SignupPage from "./Screens/Auth/Signup";
import ForgotPasswordPage from "./Screens/Auth/ForgotPassword";
import ResetPasswordPage from "./Screens/Auth/ResetPassword";
import VerificationCode from "./Screens/Auth/VerificationCode";
import DashboardPage from "./Screens/Admin/Dashboard";
import AddBlogPage from "./Screens/Admin/Blogs/AddBlog";
import ContentCreatorDashboardPage from "./Screens/ContentCreator/Dashboard";
import CreatorBlogs from "./Screens/ContentCreator/Blogs";
import AddCreatorBlogPage from "./Screens/ContentCreator/Blogs/addBlog";
import EditCreatorBlogPage from "./Screens/ContentCreator/Blogs/editBlog";
import UsersPage from "./Screens/Admin/Users";
import UserRolesPage from "./Screens/Admin/UserRoles";
import SinglePost from "./Screens/Feed/SingleFeed";
import EditAdminBlogPage from "./Screens/Admin/Blogs/editBlog";
import PreviewBlogDataPage from "./Screens/Admin/Blogs/previewBlog";
import AdminBlogsPage from "./Screens/Admin/Blogs";
import BlogsPage from "./Screens/Feed";
import AdminProfilePage from "./Screens/Admin/Profile";
import CreatorProfilePage from "./Screens/ContentCreator/Profile";
import AdminPasswordChangePage from "./Screens/Admin/PasswordReset";
import CreatorPasswordChangePage from "./Screens/ContentCreator/PasswordReset";
import AdminPollsPage from "./Screens/Admin/Polls";
import AdminAddPollPage from "./Screens/Admin/Polls/components/AddPoll";
import AdminEditPollPage from "./Screens/Admin/Polls/components/EditPoll";
import CreatorPollsPage from "./Screens/ContentCreator/Polls";
import CreatorAddPollPage from "./Screens/ContentCreator/Polls/components/AddPoll";
import CreatorEditPollPage from "./Screens/ContentCreator/Polls/components/EditPoll";
import ViewPoll from "./Screens/ContentCreator/Polls/components/ViewPoll";
import AdminViewPoll from "./Screens/Admin/Polls/components/ViewPoll";
import AdminForumsPage from "./Screens/Admin/Forums";
import AdminAddForumPage from "./Screens/Admin/Forums/components/AddForum";
import AdminEditForumPage from "./Screens/Admin/Forums/components/EditForum";
import AdminViewForumPage from "./Screens/Admin/Forums/components/ViewForum";
import CreatorForumsPage from "./Screens/ContentCreator/Forums";
import CreatorAddForumPage from "./Screens/ContentCreator/Forums/components/AddForum";
import CreatorEditForumPage from "./Screens/ContentCreator/Forums/components/EditForum";
import AdminManageForumPage from "./Screens/Admin/Forums/components/ManageForum";
import ForumsPage from "./Screens/Forum";
import ForumPost from "./Screens/Forum/SingleForum/components/forumPost";
import CreatorManageForumPage from "./Screens/ContentCreator/Forums/components/ManageForum";
import AdminDocumentsVault from "./Screens/Admin/DocumentsVault";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<SignupPage/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/verify-code" element={<VerificationCode/>}/>

                {/* Guest */}
                <Route path="/blog/:id" element={<SinglePost/>}/>
                <Route path="/feed" element={<BlogsPage/>}/>
                <Route path="/forums" element={<ForumsPage/>}/>
                <Route path="/forums/:id" element={<ForumPost/>}/>

                {/* Admin Dashboard */}
                <Route path="/admin/dashboard" exact element={<DashboardPage/>}/>
                <Route path="/admin/users" exact element={<UsersPage/>}/>
                <Route path="/admin/user-roles" exact element={<UserRolesPage/>}/>
                {/* Blogs */}
                <Route path="/admin/blogs" exact element={<AdminBlogsPage/>}/>
                <Route path="/admin/blogs/add" exact element={<AddBlogPage/>}/>
                <Route path="/admin/blogs/edit/:id" exact element={<EditAdminBlogPage/>}/>
                <Route path="/admin/blogs/preview/:id" exact element={<PreviewBlogDataPage/>}/>
                {/* Polls */}
                <Route path="/admin/polls" exact element={<AdminPollsPage/>}/>
                <Route path="/admin/polls/add" exact element={<AdminAddPollPage/>}/>
                <Route path="/admin/polls/edit/:id" exact element={<AdminEditPollPage/>}/>
                <Route path="/admin/polls/:id" exact element={<AdminViewPoll/>}/>
                {/* Forums */}
                <Route path="/admin/forums" exact element={<AdminForumsPage/>}/>
                <Route path="/admin/forums/add" exact element={<AdminAddForumPage/>}/>
                <Route path="/admin/forums/edit/:id" exact element={<AdminEditForumPage/>}/>
                <Route path="/admin/forums/manage/:id" exact element={<AdminManageForumPage/>}/>
                <Route path="/admin/forums/:id" exact element={<AdminViewForumPage/>}/>

                {/* Document Vault */}
                <Route path="/admin/document-vault" exact element={<AdminDocumentsVault/>}/>

                {/* Profile */}
                <Route path="/admin/profile" exact element={<AdminProfilePage/>}/>
                <Route path="/admin/change-password" exact element={<AdminPasswordChangePage/>}/>

                {/* Content Creator */}
                <Route path="/creator/dashboard" exact element={<ContentCreatorDashboardPage/>}/>
                <Route path="/creator/blogs" exact element={<CreatorBlogs/>}/>
                <Route path="/creator/blogs/add" exact element={<AddCreatorBlogPage/>}/>
                <Route path="/creator/blogs/edit/:id" exact element={<EditCreatorBlogPage/>}/>
                <Route path="/creator/profile" exact element={<CreatorProfilePage/>}/>
                <Route path="/creator/change-password" exact element={<CreatorPasswordChangePage/>}/>

                {/* Polls */}
                <Route path="/creator/polls" exact element={<CreatorPollsPage/>}/>
                <Route path="/creator/polls/add" exact element={<CreatorAddPollPage/>}/>
                <Route path="/creator/polls/edit/:id" exact element={<CreatorEditPollPage/>}/>
                <Route path="/creator/polls/:id" exact element={<ViewPoll/>}/>

                {/* Forums */}
                <Route path="/creator/forums" exact element={<CreatorForumsPage/>}/>
                <Route path="/creator/forums/add" exact element={<CreatorAddForumPage/>}/>
                <Route path="/creator/forums/edit/:id" exact element={<CreatorEditForumPage/>}/>
                <Route path="/creator/forums/manage/:id" exact element={<CreatorManageForumPage/>}/>
                <Route path="/creator/forums/:id" exact element={<ViewPoll/>}/>

            </Routes>
        </>
    );
}

export default App;
