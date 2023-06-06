import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";


function CustomButton({ text, loading, progressColor, ...props }) {

  const progress = (color) => {
    return (<ClipLoader
      color={color ? color: "#fff"}
      size={15}
      aria-label="Loading Spinner"
    />)
  }
  
  return ( 
    <button {...props}>
      {loading ? progress(progressColor) : text}
    </button>
  );
}

export default CustomButton;