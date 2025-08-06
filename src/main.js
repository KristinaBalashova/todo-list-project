import { createApp } from 'vue';
import App from './App.vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';
import router from './router';
import './assets/main.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  maxToasts: 5,
  newestOnTop: true,
};

const vuetify = createVuetify({
  components,
  directives,
});

async function bootstrap() {
  const res = await fetch('/locales/ru.json');
  if (!res.ok) {
    console.error('Failed to load translations:', res.statusText);
    return;
  }
  const ru = await res.json();

  const { createI18n } = await import('vue-i18n');

  const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'ru',
    flatJson: true,
    messages: {
      ru,
    },
  });

  const app = createApp(App);

  app.use(createPinia());
  app.use(Toast, toastOptions);
  app.use(router);
  app.use(vuetify);
  app.use(i18n);

  app.mount('#app');
}

bootstrap();
