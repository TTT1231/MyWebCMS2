import { createApp } from 'vue';
import '@/assets/globalcss/scroll.less';
// import "element-plus/dist/index.css";
import App from './App.vue';
import { router } from './router';
import '@/assets/globalcss/input.css';

import 'nprogress/nprogress.css';
import { i18n } from '@/locales/index';
import { setupStore } from './store';
import { setupRouter, setupRouterGuards } from './router/guard';

const app = createApp(App);
//配置路由
setupRouter(app);
//初始化store
setupStore(app);

//路由守卫
setupRouterGuards();
//国际化
app.use(i18n);
app.mount('#app');
