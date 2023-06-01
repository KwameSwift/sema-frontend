import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";

function SignupPage() {
  const [userType, setUserType] = useState("Guest");

  const navigate = useNavigate();

  const changeUserType = (status) => {
    setUserType(status);
  };

  return (
    <div className="auth-login">
      <AuthSidebar />
      <div className="login-content">
        <div className="content-wrapper">
          <div className="head-sect">
            <h1>Sign up!</h1>
          </div>
          <div className="input-group">
            <UnBorderedInput type="email" placeholder="Email Address" />
            <UnBorderedInput type="text" placeholder="First Name" />
            <UnBorderedInput type="text" placeholder="Last Name" />
            {userType === "Content Creator" && (
              <>
                <UnBorderedInput type="text" placeholder="Organization" />
                <UnBorderedInput type="text" placeholder="Country" />
                <UnBorderedInput type="text" placeholder="Mobile Number" />
                <UnBorderedInput type="password" placeholder="Password" />
              </>
            )}
            <div className="row user-type-sect">
              <div
                className={`type-item ${userType === "Guest" ? "selected" : ""}`}
                onClick={() => changeUserType("Guest")}
              >
                Guest
              </div>
              <div
                className={`type-item ${userType === "Content Creator" ? "selected" : ""}`}
                onClick={() => changeUserType("Content Creator")}
              >
                Content Creator
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit">Login with email</button>
          </div>
          <div className="auth-bottom-text">
            <span onClick={() => navigate('/login')}>Already have an account?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
