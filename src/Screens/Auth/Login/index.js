import React from "react";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import { useNavigate } from "react-router-dom";

import "../style.scss";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-login">
      <AuthSidebar />
      <div className="login-content">
        <div className="content-wrapper">
          <div className="head-sect">
            <h1>Login to your account</h1>
            <p>
              Don&apos;t have an account?
              <span onClick={() => navigate("/register")}>
                Sign up free!
              </span>
            </p>
          </div>
          <div className="input-group">
            <UnBorderedInput type="email" placeholder="Email Address" />
            <UnBorderedInput type="password" placeholder="Password" />
          </div>
          <div className="other-input-group">
            <span>
              <input type="checkbox" /> Remember me
            </span>
            <span>Forgot Password?</span>
          </div>
          <div className="submit-btn">
            <button type="submit">Login with email</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
