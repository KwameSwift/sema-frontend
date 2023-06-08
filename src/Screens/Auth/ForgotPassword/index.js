import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import CustomButton from "../../../Components/Common/CustomButton";
import { isRequiredFieldsPassed } from "../../../utils/helpers";
import { axiosClient } from "../../../libs/axiosClient";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import "../style.scss";
import { setUserEmail } from "../../../Redux/slices/userSlice";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false); 

  const handlePasswordChangeInitiate = async () => {
    setLoading(true);
    try {
      await axiosClient.post("auth/send-reset-password-mail/", { ...state });
      dispatch(setUserEmail(state.email));
      setLoading(false);
      navigate("/verify-code");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err.response.data.detail);
    }
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setBtnDisabled(!isRequiredFieldsPassed(state, 1, "eq"));
  }, [state]);

  return (
    <div className="auth-login">
      <AuthSidebar />
      <div className="login-content">
        <div className="content-wrapper">
          <div className="head-sect">
            <h1>Recover your password</h1>
            <p>
              Enter your email address below to receive further instructions
            </p>
          </div>
          <div className="input-group">
            <UnBorderedInput
              type="email"
              placeholder="Email Address"
              iconName="BsMailbox"
              name="email"
              onChange={handleChange}
              autofocus
            />
          </div>

          <div className="submit-btn">
            <CustomButton
              type="button"
              onClick={handlePasswordChangeInitiate}
              loading={loading}
              disabled={loading || btnDisabled}
              text="Send Email"
            />
          </div>
          <div className="auth-bottom-text non-hover column">
            <span onClick={() => navigate("/login")}>
              Already have an account?
            </span>
            <span  onClick={() => navigate("/register")}>
              Don&apos;t have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
