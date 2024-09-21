import { globalLangEnum } from '@/enums/globalEnums';
import { defineStore } from 'pinia';
import { pinia } from '..';
//全局配置store

export interface GlobalConfigState {
   theme?: string;
   currentLang: globalLangEnum;
   rememberPassword: Boolean;
   isAddRoutes: Boolean;
}
export const useGlobalConfigStore = defineStore('globalConfig', {
   state: (): GlobalConfigState => ({
      currentLang: globalLangEnum.zhCN,
      rememberPassword: true,
      isAddRoutes: false
   }),
   getters: {
      getTheme: (state) => state.theme,
      getLang: (state) => state.currentLang,
      getRememberPassword: (state) => state.rememberPassword,
      getIsAddRoutes: (state) => state.isAddRoutes
   },
   actions: {
      setTheme(theme: string) {
         this.theme = theme;
      },
      setCurrentLang(lang: globalLangEnum) {
         this.currentLang = lang;
      },
      setRememberPassword(rememberPassword: Boolean) {
         this.rememberPassword = rememberPassword;
      },
      setIsAddRoutes(isAddRoutes: Boolean) {
         this.isAddRoutes = isAddRoutes;
      }
   }
});

/**setup之外使用 */
export const useGlobalConfigOutsideSetup = () => {
   return useGlobalConfigStore(pinia);
};
