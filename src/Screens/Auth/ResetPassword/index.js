import React from "react";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import { useNavigate } from "react-router-dom";

import "../style.scss";

function ResetPasswordPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-login">
      <AuthSidebar />
      <div className="login-content">
        <div className="content-wrapper">
          <div className="head-sect">
            <h1>Reset Password</h1>
            <p>Regain control of your account with a secure and personalized new password.</p>
          </div>
          <div className="input-group">
            <UnBorderedInput
              type="password"
              placeholder="New password"
              iconName="BsKey"
              autofocus
            />
            <UnBorderedInput
              type="password"
              placeholder="Confirm new password"
              iconName="BsKey"
              autofocus
            />
          </div>
        
          <div className="submit-btn">
            <button type="submit">Recover your password</button>
          </div>
          <div className="auth-bottom-text non-hover column">
            <span onClick={() => navigate("/login")}>
              Already have an account?
            </span>
            <span onClick={() => navigate("/register")}>
              Don&apos;t have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
