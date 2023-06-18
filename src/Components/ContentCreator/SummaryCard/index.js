import React from 'react';
import "./style.scss";
import DynamicReactIcon from '../../Common/CustomIcon';

function SummaryCard(props) {
  return ( 
    <div className='summary-card rounded-md p-3'>
      <div className='flex justify-between'>
        <h3 className='text-[20px] font-bold'>{props.name}</h3>
        <span><DynamicReactIcon stroke={"#e14d2a"} name={props.icon}/></span>
      </div>
      <div className='count text-[40px] font-bold'>
        {props.count}
      </div>
    </div>
  );
}

export default SummaryCard;