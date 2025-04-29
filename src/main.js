import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia'
//import router from './router'

const options = {
  position: "top-right",
  timeout: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  maxToasts: 5,
  newestOnTop: true,
};

const app = createApp(App)

app.use(createPinia());
app.mount('#app');
app.use(Toast, options);
//app.use(router)
