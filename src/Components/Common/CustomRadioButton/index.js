import React from 'react';
import "./style.scss";

function CustomRadioInput({ optionKey, val, name, ...props }) {
  return ( 
    <div className="custom-radio">
      <input {...props} type="radio" id={val} name={name} />
      <label htmlFor={val}>{optionKey}</label>
    </div>
  );
}

export default CustomRadioInput;