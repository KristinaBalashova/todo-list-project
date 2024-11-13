import Vue from 'vue';

import App from './App.vue';
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.use(Toast);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
