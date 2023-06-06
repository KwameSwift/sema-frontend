import React, { useEffect, useState } from 'react'
import AuthSidebar from "../../../Components/Auth/Sidebar";
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
import SocialLoginButtons from '../../../Components/SocialLoginButtons';


function VerificationCode() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  // const [state, setState] = useState({});

  // const handleChange = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value
  //   });
  // };

  useEffect(() => {
    console.log(otp);
  }, [otp])

  return ( 
    <div className="auth-login">
      <AuthSidebar />
      <div className="login-content">
        <div className="content-wrapper">
          <div className="head-sect">
            <h1>Verification Code</h1>
            <SocialLoginButtons />
            <p className='verify-code subtext'>
              Enter your verification code.
            </p>
          </div>
          <div className='otp-sect'>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              inputStyle={{ 
                width: 40, 
                height: 40,
                borderRadius: 5,
                border: "1px solid #9EAAAC",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="auth-bottom-text request-verification">
            <span onClick={() => navigate("/login")}>
              Request a new code in 00:10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;