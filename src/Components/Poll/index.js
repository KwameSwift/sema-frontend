import React, { useState } from 'react';
import "./style.scss";


function Poll(){
  const [isRotated, setIsRotated] = useState(false);

  const onRotate = () => setIsRotated((rotated) => !rotated);
  return(
    <div className={`poll card ${isRotated ? 'rotated' : ''}`} onClick={onRotate}>
      <div className="front"> 
        front
      </div>
      <div className="back"> 
        back
      </div>
    </div>
  )
}

export default Poll;