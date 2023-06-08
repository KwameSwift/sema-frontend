import React from "react";
import UnBorderedInput from "../../../../Components/Common/UnBorderedInput";

function RegisterFirstStep({ handleChange }) {
  return (
    <>
      <UnBorderedInput
        type="email"
        iconName="BsMailbox"
        onChange={handleChange}
        name="email"
        placeholder="Email Address"
        autoFocus
      />
      <UnBorderedInput
        type="text"
        iconName="BsFillPersonCheckFill"
        onChange={handleChange}
        name="first_name"
        placeholder="First Name"
      />
      <UnBorderedInput
        type="text"
        iconName="BsFillPersonFill"
        onChange={handleChange}
        name="last_name"
        placeholder="Last Name"
      />
    </>
  );
}

export default RegisterFirstStep;
