import React from 'react'
import * as Icons from "react-icons/bs";

function DynamicReactIcon ({ name, stroke, size }) {
  const IconComponent = Icons[name];

  if (!IconComponent) { 
    return <Icons.BsMailbox size={size || 22} fill={stroke} />;
  }

  return <IconComponent size={size || 22} fill={stroke} />;
}

export default DynamicReactIcon;