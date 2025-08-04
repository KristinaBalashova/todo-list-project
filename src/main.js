import { createApp } from 'vue';
import App from './App.vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';
import router from './router';
import './assets/main.css';
import { i18n } from './plugins/i18n';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const options = {
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

const app = createApp(App);

app.use(createPinia());
app.use(Toast, options);
app.use(router);
app.use(vuetify);
app.use(i18n);
app.mount('#app');
