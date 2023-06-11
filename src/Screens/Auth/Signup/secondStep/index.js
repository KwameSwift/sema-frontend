import React from "react";
import UnBorderedInput from "../../../../Components/Common/UnBorderedInput";
import UnBorderedSelect from "../../../../Components/Common/UnBorderedSelect";

function RegisterSecondStep({ handleChange, options }) {

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
      <UnBorderedSelect
        iconName="BsGeoAltFill"
        type="text"
        name="country_id"
        onChange={handleChange}
        options={options}
        dataType={"country"}
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
