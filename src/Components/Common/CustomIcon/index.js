import React from 'react'
import * as Icons from "react-icons/bs";

function DynamicReactIcon ({ name, stroke }) {
  const IconComponent = Icons[name];

  if (!IconComponent) { 
    return <Icons.BsMailbox size={22} fill={stroke} />;
  }

  return <IconComponent size={22} fill={stroke} />;
}

export default DynamicReactIcon;