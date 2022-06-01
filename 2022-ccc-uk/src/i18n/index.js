import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import tw from './zh-TW.json';

const resources = {
  en: {
    translation: en,
  },
  'zh-TW': {
    translation: tw,
  },
};

let browserLanguage = navigator.language || navigator.userLanguage
if (browserLanguage.toLowerCase().includes('zh')) {
  browserLanguage = 'zh-TW'
} else {
  browserLanguage = 'en'
}

i18n.use(initReactI18next).init({
  resources,
  lng: browserLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});



export default i18n;
