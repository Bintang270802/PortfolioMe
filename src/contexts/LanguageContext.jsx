import { useState } from 'react';
import { LanguageContext } from './language';
import { translations } from '../translations';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Cek localStorage atau default ke bahasa Indonesia
    const saved = localStorage.getItem('language');
    return saved || 'id';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};