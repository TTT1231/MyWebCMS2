import { defineStore } from 'pinia';
import type { MenusType } from '@/types/user';
import { persistent } from '@/utils/permission/persistent';
import { StorageEnum } from '@/enums/storage';


const filterMenus = (menus: MenusType[]) => {
   const res: MenusType[] = [];
   menus.forEach((item) => {
      const tempitem = { ...item };
      if (!item.ishide) {
         if (tempitem.childrens && tempitem.childrens.length > 0) {
            tempitem.childrens = filterMenus(tempitem.childrens);
         }
         res.push(tempitem);
      }
   });
   return res;
};

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
         let tempmenus= filterMenus(menus)
 
         this.menus = tempmenus;
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
            console.log('restore Menus')
            let menus = JSON.parse(JSON.stringify(menusStr)) as MenusType[];
            let allmenus = JSON.parse(JSON.stringify(allmenusStr)) as MenusType[];
            this.setMenus(menus);
            this.setAllMenus(allmenus);
         }
      }
   },
   persist: false
});
