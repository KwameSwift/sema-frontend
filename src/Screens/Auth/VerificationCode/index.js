import React, { useEffect, useState, useRef } from 'react'
import OTPInput from 'react-otp-input';
import AuthSidebar from "../../../Components/Auth/Sidebar";
import { useNavigate } from 'react-router-dom';
import { axiosClient } from "../../../libs/axiosClient";
import SocialLoginButtons from '../../../Components/SocialLoginButtons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from "../../../Assets/images/logo-small.png"


function VerificationCode() {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState("");
  const user = useSelector((store) => store.user);
  const intervalRef = useRef(null);

  const verifyCode = async () => {
    try {
      await axiosClient.post('/auth/verify-password-reset-code/', {
        email: user.email,
        reset_code: otp
      });
      toast.success("Code Verified");
      await new Promise(r => setTimeout(r, 2000));
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response.data.detail);
    }
  }
  const getFormattedCountdown = () => {
    // Format the countdown to display as mm:ss
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const tick = () => {
    setCountdown(prevCountdown => {
      if (prevCountdown <= 0) {
        clearInterval(intervalRef.current);
        return 0;
      }
      return prevCountdown - 1;
    });
  };

  useEffect(() => {
    if (otp.length === 6) {
      verifyCode();
    }
  }, [otp])


  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return ( 
    <div className="auth-login verification-code">
      <AuthSidebar />
      <div className="login-content">
        <div className="content-wrapper">
          <div className='logo-sect'>
            <img src={logo} className='logo' alt="sema logo"/>
            <h1 className='company-header'>SEMA</h1>
          </div>
          <div className="head-sect">
            <h1>Verification Code</h1>
            <SocialLoginButtons />
            <p className='verify-code subtext'>
              Enter your verification code.
            </p>
          </div>
          <div className='otp-sect'>
            <OTPInput
              inputType='tel'
              value={otp}
              onChange={setOtp}
              numInputs={6}
              placeholder='000000'
              renderSeparator={<span>-</span>}
              inputStyle={{ 
                width: 60, 
                height: 60,
                borderRadius: 5,
                fontSize: 50,
                border: "1px solid #9EAAAC",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="auth-bottom-text request-verification">
            <span>Request a new code {getFormattedCountdown() === "00:00" ? " " : `in ${getFormattedCountdown()}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;