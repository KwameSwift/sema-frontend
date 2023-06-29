import React from 'react'
import { Dropdown } from "react-bootstrap";
import EnLogo from "../../../Assets/images/united-kingdom-logo.png";
import SwLogo from "../../../Assets/images/tanzania-logo.png";
import { useTranslation } from 'react-i18next';
import "./style.scss";

export default function LanguageDropdown () {
  const [, i18n] = useTranslation();

  const handleLanguageChange = (selectedLanguage) => {
    console.log(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const languages = {
    "en": {name: "English", value: "en", icon: EnLogo},
    "sw": {name: "Swahili", value: "sw", icon: SwLogo}
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="language-dropdown">
        <img src={languages[i18n.language].icon} className='w-[25px] h-[25px] mr-2' />
        {languages[i18n.language].name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.values(languages).map((elt) =>
        <Dropdown.Item key={elt.value} className='flex' onClick={() => handleLanguageChange(elt.value)}>
          <img src={elt.icon} className='w-[25px] h-[25px] mr-2' /> {elt.name}
        </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
