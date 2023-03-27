import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { enPreferences, enGeneral } from './en';
import { zhPreferences, zhGeneral } from './zh';

export const translations = {
  en: {
    preferences: enPreferences,
    general: enGeneral,
  },
  zh: {
    preferences: zhPreferences,
    general: zhGeneral,
  },
};

export type Language = keyof typeof translations;

export const defaultNS = 'general';

export async function initI18n() {
  const i18 = i18n.use(LanguageDetector).use(initReactI18next);
  await i18.init({
    resources: translations,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    fallbackLng: 'en',
    defaultNS,
  });
  return i18;
}
