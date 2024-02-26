import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.scss'
import { VueQueryPlugin } from "@tanstack/vue-query";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin);
app.use(ToastPlugin);

app.mount('#app')
