import React from 'react'
import { Dropdown } from "react-bootstrap";
import EnLogo from "../../../Assets/images/united-kingdom-logo.png";
import SwLogo from "../../../Assets/images/tanzania-logo.png";
import "./style.scss";

export default function LanguageDropdown () {
  const handleLanguageChange = (selectedLanguage) => {
    // Implement logic to handle language change
    console.log(`Selected language: ${selectedLanguage}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="language-dropdown">
        <img src={EnLogo} className='w-[25px] h-[25px] mr-2' />
        English
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className='flex' onSelect={() => handleLanguageChange('en')}>
          <img src={EnLogo} className='w-[25px] h-[25px] mr-2' /> English
        </Dropdown.Item>
        <Dropdown.Item className='flex' onSelect={() => handleLanguageChange('fr')}>
          <img src={SwLogo} className='w-[25px] h-[25px] mr-2' /> Swahili
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
