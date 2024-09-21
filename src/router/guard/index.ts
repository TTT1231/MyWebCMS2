import type { Router } from 'vue-router';
import { persistent } from '@/utils/permission/persistent';
import NProgress from 'nprogress';
import './barStyle.less';
import { App, ref } from 'vue';
import { TOKEN__KEY } from '@/enums/user';
import { useRoutesStore } from '@/store/modules/routesModule';
import { router } from '@/router';
import { useMenusStore } from '@/store/modules/menusModule';
const isAddRoutes = ref(false);
export function setupRouterGuards() {
   // if(!isAddRoutes.value){
   //     isAddRoutes.value=true;
   //     let routes=useRoutesStore().routes;
   //     routes.forEach((item)=>{
   //         router.addRoute(item);
   //     })
   // }else{

   // }

   createPermissionGuard(router);
}
export function setupRouter(app: App<Element>) {
   const routesStore = useRoutesStore();
   const menusStore = useMenusStore();
   menusStore.restoreData();
   routesStore.restoreData();
   app.use(router);
}
//路由白名单
export const whilteRoutes: string[] = ['/', '/error'];
NProgress.configure({ showSpinner: false });

function createPermissionGuard(router: Router) {
   router.beforeEach((to, _, next) => {
      let token = persistent.getSessionOfKey(TOKEN__KEY);
      NProgress.start();

      //不是登录页、获取到了token,或者导航到了错误页面
      if (to.path !== '/' && token !== null) {
         next();
      } else if (to.name === 'error') {
         next();
      } else if (whilteRoutes.includes(to.path)) {
         next();
      } else if (token === null) {
         next({ name: 'home' });
      } else {
         next();
      }
   });

   router.afterEach(() => {
      NProgress.done();
   });
}
