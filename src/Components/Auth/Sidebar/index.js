import React from "react";
import { useLocation } from "react-router-dom";
// import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import logo from "../../../Assets/images/logo-small.png";
import "./style.scss";

function AuthSidebar() {
  const location = useLocation();
  // const btnData = [
  //   {
  //     id: "fb-btn",
  //     icon: <FaFacebookF fill='#fff' size={20}/>,
  //     name: "Facebook",
  //     color: "#3b5998"
  //   },
  //   {
  //     id: "tw-btn",
  //     icon: <FaTwitter fill='#fff' size={20}/>,
  //     name: "Twitter",
  //     color: "#00acee"
  //   },
  //   {
  //     id: "google-btn",
  //     icon: <FaGoogle fill='#fff' size={20}/>,
  //     name: "Google",
  //     color: "#EA4335"
  //   },
  // ]

  const routeData = {
    "/login": "Welcome to the login page! We're excited to have you back. ",
    "/register":
      "Welcome to the signup page! We're delighted that you've chosen to join our platform. Get ready to embark on an exciting journey of exploration and possibilities.",
    "/forgot-password": "Forgot your password? No problem! We're here to assist you in recovering access to your account.",
    "/verify-code": "Welcome to the OTP code verification page! We're here to help you complete the final step of verifying your account.",
  };

  return (
    <div className="sidebar w-[30%]">
      <div className="logo-sect">
        <img src={logo} className="logo" alt="sema logo" />
        <h1 className="company-header font-bold text-[20px]">SEMA</h1>
      </div>
      <div className="header-text max-w-[90%]">
        <p>{routeData[location.pathname] || ""}</p>
      </div>
      {/*<div className='social-buttons'>
        {btnData.map((btn, index) => 
          <div 
            className={`flex items-center justify-start social-button ${btn.id} `} 
            key={index}
            style={{ backgroundColor: btn.color }}
          >
            <span>{btn.icon}</span>
            <span className='btn-text'>Login with {btn.name}</span>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default AuthSidebar;
