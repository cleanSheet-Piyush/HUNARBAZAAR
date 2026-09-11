import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultStrings, hindiStrings } from "../i18n/strings";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // Store as "hi" or "en" — short codes used by all components
  const [language, setLanguageState] = useState(
    localStorage.getItem("appLanguage") || "en"
  );
  const [strings, setStrings] = useState(
    (localStorage.getItem("appLanguage") || "en") === "hi"
      ? { ...defaultStrings, ...hindiStrings }
      : defaultStrings
  );

  const applyLanguage = (lang) => {
    // Normalize: accept "Hindi"/"hi" → "hi", "English"/"en" → "en"
    const code = (lang === "Hindi" || lang === "hi") ? "hi" : "en";
    setLanguageState(code);
    localStorage.setItem("appLanguage", code);
    setStrings(code === "hi" ? { ...defaultStrings, ...hindiStrings } : defaultStrings);
  };

  useEffect(() => {
    // Migrate old "English"/"Hindi" values stored in localStorage
    const stored = localStorage.getItem("appLanguage");
    if (stored === "English") applyLanguage("en");
    else if (stored === "Hindi") applyLanguage("hi");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = (key) => strings[key] || defaultStrings[key] || key;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: applyLanguage, t, loading: false }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);