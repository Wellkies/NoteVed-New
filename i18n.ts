import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

// import odia from './assets/locales/odia/translation.json';
import Odia from './assets/Language/Odia/translation.json';
import English from './assets/Language/English/translation.json';
import Hindi from './assets/Language/Hindi/translation.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'odia',
  resources: {
    english: English,
    hindi: Hindi,
    odia: Odia,
    // bn: bengali,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
