import React from 'react'
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"

function SocialLoginButtons() {

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
    <div className="small-icons-social">
      {btnData.map((btn, index) => 
        <div 
          className={`social-button mobile ${btn.id} `} 
          key={index}
          style={{ backgroundColor: btn.color }}
        >
          <span>{btn.icon}</span>
        </div>
      )}
    </div>
  );
}

export default SocialLoginButtons;