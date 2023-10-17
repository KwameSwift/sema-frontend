import React from "react";
import UnBorderedInput from "../../../../Components/Common/UnBorderedInput";
import {useTranslation} from "react-i18next";
import UnBorderedSelect from "../../../../Components/Common/UnBorderedSelect";

function RegisterFirstStep({handleChange, options, userType}) {
    const {t} = useTranslation();

    return (
        <>
            <UnBorderedInput
                type="email"
                iconName="BsMailbox"
                onChange={handleChange}
                name="email"
                placeholder={t('auth.emailAddress')}
                autoFocus
            />
            <UnBorderedInput
                type="text"
                iconName="BsFillPersonCheckFill"
                onChange={handleChange}
                name="first_name"
                placeholder={t('auth.firstName')}
            />
            <UnBorderedInput
                type="text"
                iconName="BsFillPersonFill"
                onChange={handleChange}
                name="last_name"
                placeholder={t('auth.lastName')}
            />
            {userType === "Guest" && <>
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
                    placeholder={t('auth.noCountryCode')}
                />
            </>
            }
        </>
    );
}

export default RegisterFirstStep;
