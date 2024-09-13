import { createApp } from "vue";

import "element-plus/dist/index.css";
import App from "./App.vue";
import {router} from "./router";
import {setupStore} from "./store";
const app=createApp(App);
setupStore(app);
app.use(router).mount("#app");

