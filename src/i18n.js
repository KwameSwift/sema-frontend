import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import EN from "./locales/en.json";
import SW from "./locales/sw.json";

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: EN,
  },
  sw: {
    translation: SW,
  },
};

// Retrieve the previously selected language from localStorage
const savedLanguage = localStorage.getItem("language");

// Set the default language to the previously selected language or "en" if not available
const defaultLanguage = savedLanguage || "en";

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:defaultLanguage, //default language
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
  });

// Save the selected language to localStorage whenever it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;