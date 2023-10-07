import React from "react";
import UnBorderedInput from "../../../../Components/Common/UnBorderedInput";
import {useTranslation} from "react-i18next";

function RegisterFirstStep({handleChange}) {
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
        </>
    );
}

export default RegisterFirstStep;
