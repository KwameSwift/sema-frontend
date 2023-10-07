import React from "react";
import UnBorderedInput from "../../../../Components/Common/UnBorderedInput";
import UnBorderedSelect from "../../../../Components/Common/UnBorderedSelect";
import {useTranslation} from "react-i18next";

function RegisterSecondStep({handleChange, options}) {
    const {t} = useTranslation();
    return (
        <>
            <UnBorderedInput
                iconName="BsFillBuildingsFill"
                type="text"
                onChange={handleChange}
                name="organization"
                placeholder={t('auth.organization')}
                autoFocus
            />
            <UnBorderedSelect
                iconName="BsGeoAltFill"
                type="text"
                name="country_id"
                onChange={handleChange}
                options={options}
                dataType={"country"}
                placeholder={t('auth.country')}
            />
            <UnBorderedInput
                iconName="BsFillTelephoneFill"
                type="text"
                name="mobile_number"
                onChange={handleChange}
                placeholder={t('auth.mobileNumber')}
            />
            <UnBorderedInput
                iconName="BsKey"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder={t('auth.password')}
            />
            <UnBorderedInput
                iconName="BsKey"
                type="password"
                name="confirm_password"
                onChange={handleChange}
                placeholder={t('auth.confirmPassword')}
            />
        </>
    );
}

export default RegisterSecondStep;
