import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleLangChange = evt => {
    const lang = evt.target.value;
    console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <select style={{color:"black", background:"white"}} onChange={handleLangChange} value={language}>
      <option value="fr">Francais</option>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSelect;
