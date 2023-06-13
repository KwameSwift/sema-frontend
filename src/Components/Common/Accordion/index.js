import React, { useState } from 'react';
import DynamicReactIcon from '../../Common/CustomIcon';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

function AccordionItem ({ title, icon, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-4 py-2 mb-2 bg-[#fff] rounded-md focus:outline-none"
        onClick={toggleAccordion}
      > 
        <span className='flex justify-between'>
          <DynamicReactIcon name={icon} size={20} />
          <span className='ml-2 font-bold text-[15px]'>{title}</span>
        </span>
        {isOpen ? (
          <BsChevronUp className="w-4 h-4 transition-transform duration-300" />
        ) : (
          <BsChevronDown className="w-4 h-4 transition-transform duration-300" />
        )}
      </button>
      {isOpen && <div className="px-4 bg-white rounded-md">{children}</div>}
    </div>
  );
}


export default AccordionItem;