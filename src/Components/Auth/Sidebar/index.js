import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import logo from "../../../Assets/images/logo-small.png"
import "./style.scss";

function AuthSidebar() {
  const btnData = [
    {
      id: "fb-btn",
      icon: <FaFacebookF fill='#fff' size={13}/>,
      name: "Facebook",
      color: "#3b5998"
    },
    {
      id: "tw-btn",
      icon: <FaTwitter fill='#fff' size={13}/>,
      name: "Twitter",
      color: "#00acee"
    },
    {
      id: "google-btn",
      icon: <FaGoogle fill='#fff' size={13}/>,
      name: "Google",
      color: "#EA4335"
    },
  ]

  return ( 
    <div className='sidebar'>
      <div className='logo-sect'>
        <img src={logo} className='logo' alt="sema logo"/>
        <h1 className='company-header'>SEMA</h1>
      </div>
      <div className='header-text'>
        <p>Login using social media to get quick access</p>
      </div>
      <div className='social-buttons'>
        {btnData.map((btn, index) => 
          <div 
            className={`social-button ${btn.id} `} 
            key={index}
            style={{ backgroundColor: btn.color }}
          >
            <span>{btn.icon}</span>
            <span className='btn-text'>Login with {btn.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthSidebar;