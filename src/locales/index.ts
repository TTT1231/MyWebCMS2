import { createI18n } from 'vue-i18n';
import en from './lang/en/en.json';
import zhCN from './lang/zhCN/zhCN.json';
import { ref } from 'vue';
import { globalLangEnum } from '@/enums/globalEnums';
import { useGlobalConfigOutsideSetup } from '@/store/modules/globalConfigModule';
const messages = {
   zhCN,
   en
};
export const locale = ref<globalLangEnum>(useGlobalConfigOutsideSetup().getLang);
export const i18n = createI18n({
   legacy: false, //setup中使用
   locale: 'zhCN',
   messages,
   globalInjection: true
});
