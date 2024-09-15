import { createApp } from "vue";

// import "element-plus/dist/index.css";
import App from "./App.vue";
import {router} from "./router";
import {setupStore} from "./store";
import '@/assets/globalcss/input.css'
import {i18n} from '@/locales/index'
const app=createApp(App);
import { store } from "./store";
app.use(store);
app.use(i18n);
app.use(router).mount("#app");

