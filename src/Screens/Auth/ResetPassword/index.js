import React, { useEffect, useState } from "react";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import { useNavigate } from "react-router-dom";

import "../style.scss";
import CustomButton from "../../../Components/Common/CustomButton";
import { isRequiredFieldsPassed } from "../../../utils/helpers";
import { toast } from "react-toastify";
import { axiosClient } from "../../../libs/axiosClient";
import { useSelector } from "react-redux";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handlePasswordChange = async () => {
    setLoading(true);
    try {
      await axiosClient.post('auth/reset-password/', { ...state, email: user.email });
      setLoading(false);
      toast.success("Password reset successfully");
      await new Promise(r => setTimeout(r, 2000));
      navigate("/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err.response.data.detail)
    } 
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setBtnDisabled(!isRequiredFieldsPassed(state, 2, "eq"));
  }, [state])

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
              name="new_password"
              onChange={handleChange}
              autofocus
            />
            <UnBorderedInput
              type="password"
              placeholder="Confirm new password"
              iconName="BsKey"
              name="confirm_password"
              onChange={handleChange}
              autofocus
            />
          </div>
        
          <div className="submit-btn">
            <CustomButton
              type="button"
              onClick={handlePasswordChange}
              loading={loading}
              disabled={loading || btnDisabled}
              text="Recover your password"
            />
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
