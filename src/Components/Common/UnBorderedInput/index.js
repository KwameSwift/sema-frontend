import React, { useState } from 'react'
import DynamicReactIcon from "../CustomIcon";
import './style.scss';

function UnBorderedInput(props) {
  const [focus, setFocus] = useState(false);
  return ( 
    <div className="unbordered-input">
      <DynamicReactIcon name={props.iconName} stroke={focus ? '#3e6d9c': '#D9D8DB'} />
      <input {...props} 
        className={focus ? 'typing': ''}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}

export default UnBorderedInput;