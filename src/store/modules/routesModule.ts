import { defineStore } from 'pinia';
import type { BackRoutesType, RoutesType } from '@/types/login';
import { persistent } from '@/utils/permission/persistent';
import { StorageEnum } from '@/enums/storage';
import { router } from '@/router';


const filterRoutes = (routes: BackRoutesType[]) => {
   const res: BackRoutesType[] = [];
   routes.forEach((item) => {
      const tempitem = { ...item };
      if (!item.meta.ishide) {
         if (tempitem.children && tempitem.children.length > 0) {
            tempitem.children = filterRoutes(tempitem.children);
         }
         res.push(tempitem);
      }
   });
   return res;
};

//使用vite解析,vite特有
const components = import.meta.glob('../../views/**/*.vue');

function recurseAddRoutes(routes: RoutesType[]) {
   return routes.map((route) => {
      if ( route.component === ''||route.component === undefined ) {
      } else {
         route.component = components[`../../views/${route.component}.vue`];
     
        }
      // 递归处理子路由
      if (route.children.length > 0 && route.children) {
         route.children = recurseAddRoutes(route.children);
      }

      // 返回更新后的路由项
      return {
         ...route
      };
   });
}
const addAllRoutes = (routes: RoutesType[]) => {
   routes.forEach((element) => {
      router.addRoute(element);
   });
};
export const useRoutesStore = defineStore('routes', {
   state: (): {
      routes: RoutesType[];
      rawroutes: BackRoutesType[];
   } => ({
      routes: [],
      rawroutes: []
   }),
   getters: {
      getRoutes: (state) => state.routes,
      getRawRoutes: (state) => state.rawroutes
   },
   actions: {
      //使用这种方式vite warning,vite不会解析
      getComponentPath(item: BackRoutesType) {
         if (item.meta.ishome) {
            return `/src/views/${item.component}.vue`;
         } else {
            // 这里假设 item.component 包含完整的相对路径（但不包括 @/views/sys/）
            return `/src/views/sys/${item.component}.vue`;
         }
      },
      setRoutes(rawRoutes: BackRoutesType[]) {
         // console.log(menus)
         this.rawroutes = rawRoutes;
         //进一步处理
         let handleHide = filterRoutes(rawRoutes);
         

            console.log(handleHide);

         //转换路由,同时动态添加路由
         addAllRoutes(recurseAddRoutes(handleHide));

         this.routes = handleHide;
         let routes = persistent.getSessionOfKey(StorageEnum.ROUTES);
         if (!routes) {
            persistent.setSession(StorageEnum.ROUTES, this.rawroutes);
         }
      },
      restoreData() {
        
         let routesKey = persistent.getSessionOfKey(StorageEnum.ROUTES);
         if (routesKey!==null&&routesKey!=='') {
            console.log('restoreRoutes');
            let rawroutes = JSON.parse(JSON.stringify(routesKey)) as BackRoutesType[];
            this.setRoutes(rawroutes);
         }
      }
   },
   persist: false
});
