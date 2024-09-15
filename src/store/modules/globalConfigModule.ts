import { globalLangEnum } from "@/enums/globalEnums";
import { defineStore } from "pinia";
import { store } from "..";

//全局配置store

export interface GlobalConfigState {
    theme?: string,
    currentLang: globalLangEnum,
    rememberPassword: Boolean
}
export const useGlobalConfigStore=defineStore('globalConfig',{
    state: (): GlobalConfigState => ({
        currentLang: globalLangEnum.zhCN,
        rememberPassword:true
    }),
    getters: {
        getTheme: (state) => state.theme,
        getLang: (state) => state.currentLang,
        getRememberPassword: (state) => state.rememberPassword
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
    },
});

/**setup之外使用 */
export const useGlobalConfigOutsideSetup=()=>{
    return useGlobalConfigStore(store);
}