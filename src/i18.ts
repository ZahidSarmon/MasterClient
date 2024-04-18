import { createI18n } from 'vue-i18n';
import enMessages from '@/locales/en'
import seMessages from '@/locales/se'

const i18n = createI18n({
    locale: 'en', // default locale
    messages: {
      en: enMessages,
      se: seMessages,
    },
  });

export default i18n;


