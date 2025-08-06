import { createI18n } from 'vue-i18n';

const response = await fetch('/locales/ru.json');
const ru = await response.json();

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  flatJson: false,
  messages: {
    ru
  }
});

