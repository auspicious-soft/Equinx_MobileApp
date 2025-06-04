import React, { createContext, useState, useContext, useEffect } from 'react';
import { getLocalStorageData, storeLocalStorageData } from '../Utilities/Storage';
import languageData from '../Utilities/language.json';

// Define storage key
const LANGUAGE_KEY = 'app_language';

// Create context
const LanguageContext = createContext<{
  language: string;
  translations: any;
  setAppLanguage: (lang: string) => void;
}>({
  language: 'en',
  translations: languageData.en,
  setAppLanguage: () => {},
});

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(languageData.en);

  // Load saved language on startup
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await getLocalStorageData(LANGUAGE_KEY);
      if (savedLanguage) {
        setAppLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  // Set language and save to storage
  const setAppLanguage = async (lang: string) => {
    setLanguage(lang);
    setTranslations(languageData[lang as keyof typeof languageData] || languageData.en);
    await storeLocalStorageData(LANGUAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setAppLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);