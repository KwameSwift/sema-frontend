import React from 'react';
import "./style.scss";
import DynamicReactIcon from '../../Common/CustomIcon';
import {useTranslation} from "react-i18next";

function SummaryCard(props) {
    const {t} = useTranslation();
    return (
        <div className='summary-card rounded-md p-3'>
            <div className='flex justify-between'>
                <h3 className='text-[20px] font-bold'>{t(props.name.getTranslationKey())}</h3>
                <span><DynamicReactIcon stroke={"#e14d2a"} name={props.icon}/></span>
            </div>
            <div className='count text-[40px] font-bold'>
                {props.count}
            </div>
        </div>
    );
}

export default SummaryCard;
