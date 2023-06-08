import React from "react";
import UnBorderedInput from "../../../../Components/Common/UnBorderedInput";

function RegisterSecondStep({ handleChange }) {
  return (
    <>
      <UnBorderedInput
        iconName="BsFillBuildingsFill"
        type="text"
        onChange={handleChange}
        name="organization"
        placeholder="Organization"
        autoFocus
      />
      <UnBorderedInput
        iconName="BsGeoAltFill"
        type="text"
        name="country"
        onChange={handleChange}
        placeholder="Country"
      />
      <UnBorderedInput
        iconName="BsFillTelephoneFill"
        type="text"
        name="mobile_number"
        onChange={handleChange}
        placeholder="Mobile Number"
      />
      <UnBorderedInput
        iconName="BsKey"
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <UnBorderedInput
        iconName="BsKey"
        type="password"
        name="confirm_password"
        onChange={handleChange}
        placeholder="Confirm Password"
      />
    </>
  );
}

export default RegisterSecondStep;
