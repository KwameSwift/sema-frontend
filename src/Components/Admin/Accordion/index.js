import React, { useEffect, useState } from "react";
import DynamicReactIcon from "../../Common/CustomIcon";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function AdminAccordionItem({
  title,
  icon,
  children,
  bg,
  className,
  pClassName,
  cBg,
  isDropOpen
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getContentBg = () => {
    if (cBg) return cBg;
    else {
      if (bg) return "#001253";
      else return "#fff";
    }
  };

  useEffect(() => {
    setIsOpen(isDropOpen);
  }, []);

  return (
    <div className="w-full">
      <button
        className={`${pClassName} flex items-center justify-between w-full px-3 py-2 mb-2 rounded-md focus:outline-none`}
        style={{ backgroundColor: bg ? bg : "#fff" }}
        onClick={toggleAccordion}
        type="button"
      >
        <span className="flex justify-between">
          {icon && (
            <DynamicReactIcon
              name={icon}
              size={20}
              stroke={bg ? "#fff" : "#000"}
            />
          )}
          <span
            className={`ml-2 font-bold text-[15px] ${className}`}
            style={{ color: bg ? "#000" : "#000" }}
          >
            {title}
          </span>
        </span>
        {isOpen ? (
          <BsChevronUp
            className="w-4 h-4 transition-transform duration-300"
            fill={bg ? "#000" : "#000"}
          />
        ) : (
          <BsChevronDown
            className="w-4 h-4 transition-transform duration-300"
            fill={bg ? "#000" : "#000"}
          />
        )}
      </button>
      <div
        className="px-4 rounded-md"
        style={{
          backgroundColor: getContentBg(),
          display: isOpen ? "block" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminAccordionItem;
