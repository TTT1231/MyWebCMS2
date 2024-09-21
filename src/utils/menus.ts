import type { MenusType } from '@/types/user';
export function filterMenusOfIsHide(menus: MenusType[]) {
   return menus.filter((menu) => {
      const filteredChildrens = filterMenusOfIsHide(menu.childrens);
      menu.childrens = filteredChildrens;
      return !menu.ishide || menu.childrens.length > 0;
   });
}
