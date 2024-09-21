import { defineStore } from 'pinia';
import type { MenusType } from '@/types/user';
import { persistent } from '@/utils/permission/persistent';
import { StorageEnum } from '@/enums/storage';
//用户登录之后，信息存储
export const useMenusStore = defineStore('menus', {
   state: (): {
      menus: MenusType[];
      allmenus: MenusType[];
   } => ({
      menus: [],
      allmenus: []
   }),
   getters: {
      getMenus: (state) => state.menus,
      getAllMenus: (state) => state.allmenus
   },
   actions: {
      setMenus(menus: MenusType[]) {
         this.menus = menus;
         let menusKey = persistent.getSessionOfKey(StorageEnum.MENUS);
         if (!menusKey) {
            persistent.setSession(StorageEnum.MENUS, this.menus);
         }
      },
      setAllMenus(allmenus: MenusType[]) {
         this.allmenus = allmenus;
         let allmenusKey = persistent.getSessionOfKey(StorageEnum.ALLMENUS);
         if (!allmenusKey) {
            persistent.setSession(StorageEnum.ALLMENUS, this.allmenus);
         }
      },

      restoreData() {
         let menusStr = persistent.getSessionOfKey(StorageEnum.MENUS);
         let allmenusStr = persistent.getSessionOfKey(StorageEnum.ALLMENUS);
         if (menusStr !== null || allmenusStr !== null) {
            let menus = JSON.parse(JSON.stringify(menusStr)) as MenusType[];
            let allmenus = JSON.parse(JSON.stringify(allmenusStr)) as MenusType[];
            this.menus = menus;
            this.allmenus = allmenus;
         }
      }
   },
   persist: false
});
