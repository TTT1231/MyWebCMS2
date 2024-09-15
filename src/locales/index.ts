import { createI18n } from "vue-i18n";
import en from './lang/en/en.json'
import zhCN from './lang/zhCN/zhCN.json'
import { ref, watch } from "vue";
import { globalLangEnum } from "@/enums/globalEnums";
import { useGlobalConfigOutsideSetup } from "@/store/modules/globalConfigModule";
  const messages = { 
    zhCN,
    en
 }
 export const locale=ref<globalLangEnum>(useGlobalConfigOutsideSetup().getLang);
 export const i18n=createI18n({
    legacy: false, //setup中使用
    locale: 'zhCN',
    messages,
    globalInjection:true

 });
 watch(()=>locale.value,(newValue)=>{

    i18n.global.locale.value=newValue;
    useGlobalConfigOutsideSetup().setCurrentLang(newValue);
    console.log('watch回调函数执行')
 })
