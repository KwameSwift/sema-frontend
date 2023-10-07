import React, {useState} from "react";
import DynamicReactIcon from "../CustomIcon";
import "./style.scss";
import {useTranslation} from "react-i18next";

function UnBorderedSelect({iconName, options, dataType, ...props}) {
    const [focus, setFocus] = useState(false);
    const {t} = useTranslation();

    return (
        <div className="unbordered-input">
            <DynamicReactIcon
                name={iconName}
                stroke={focus ? "#3e6d9c" : "#D9D8DB"}
            />
            <select
                {...props}
                className={focus ? "typing" : ""}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            >
                <option value={0}>{t(`Select ${dataType}`.getTranslationKey())}</option>
                {options?.map((elt) =>
                    <option key={elt.id} value={elt.id}>{elt.name}</option>
                )}
            </select>
        </div>
    );
}

export default UnBorderedSelect;
