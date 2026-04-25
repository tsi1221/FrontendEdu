import { createContext, useEffect, useMemo, useState } from "react";
import { translations } from "../translations";

/**
 * @typedef {Object} LanguageContextType
 * @property {string} language
 * @property {(lang: string) => void} setLanguage
 * @property {(key: string) => string} t
 */

const LanguageContext = createContext(undefined);

const LANGUAGE_STORAGE_KEY = "edutwinLanguage";

const readInitialLanguage = () => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved && ["en", "om", "am"].includes(saved)) {
    return saved;
  }

  return "om";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(readInitialLanguage);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => translations[key]?.[language] ?? key;

  const value = useMemo(() => ({ language, setLanguage, t }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
