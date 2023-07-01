import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EnLogo from "../../../Assets/images/united-kingdom-logo.png";
import SwLogo from "../../../Assets/images/tanzania-logo.png";
import "./style.scss";
import { setLanguageCode } from "../../../Redux/slices/languageSlice";

export default function LanguageDropdown() {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((store) => store.language);

  const handleLanguageChange = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguageCode(selectedLanguage));
  };

  const languages = {
    en: { name: "English", value: "en", icon: EnLogo },
    sw: { name: "Swahili", value: "sw", icon: SwLogo },
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="language-dropdown">
        <img
          src={languages[language.code].icon}
          className="w-[25px] h-[25px] mr-2"
        />
        {languages[language.code].name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.values(languages).map((elt) => (
          <Dropdown.Item
            key={elt.value}
            className="flex"
            onClick={() => handleLanguageChange(elt.value)}
          >
            <img src={elt.icon} className="w-[25px] h-[25px] mr-2" /> {elt.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
