import React from 'react'
import DynamicReactIcon from '../../../../../Components/Common/CustomIcon';
import { getTransString } from '../../../../../utils/helpers';
import { useTranslation } from 'react-i18next';
// import DynamicReactIcon from '../../../../../Components/Common/CustomIcon';

function DashboardSummaryCards({ icon, title, count }) {
  const {t} = useTranslation();
  return ( 
    <div className="flex flex-row items-left p-3 text-[#fff] justify-between w-full">
      {/* <div><DynamicReactIcon name={name} /></div> */}
      <span className='flex flex-col justify-between'>
        <span className="flex items-center justify-center card-bg w-[50px] h-[50px] rounded">
          <DynamicReactIcon name={icon} stroke="#fff" />
        </span>
        <span className='text-[20px] font-bold'>{t(getTransString(title))}</span>
      </span>
      <span className='flex flex-col justify-end'>
        <span></span>
        <span className='text-[25px] font-bold'>{count}</span>
      </span>
    </div>    
  );
}

export default DashboardSummaryCards;