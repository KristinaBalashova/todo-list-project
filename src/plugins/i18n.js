import { createI18n } from 'vue-i18n';
import ru from '../locales/ru.js';

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  flatJson: false,
  messages: {
    ru
  }
});

