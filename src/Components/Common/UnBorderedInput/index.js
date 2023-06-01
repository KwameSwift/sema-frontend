import React, { useState } from 'react'
import { FiMail } from "react-icons/fi";
import './style.scss';

function UnBorderedInput(props) {
  const [focus, setFocus] = useState(false);
  return ( 
    <div className="unbordered-input">
      <FiMail size={20} stroke='#D9D8DB' />
      <input {...props} 
        className={focus ? 'typing': ''}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}

export default UnBorderedInput;