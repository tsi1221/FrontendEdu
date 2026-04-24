import { createContext, useState } from 'react';
import { translations } from '../translations';

/**
 * @typedef {Object} LanguageContextType
 * @property {string} language
 * @property {(lang: string) => void} setLanguage
 * @property {(key: string) => string} t
 */

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[key]?.[language] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };