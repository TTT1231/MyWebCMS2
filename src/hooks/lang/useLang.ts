import { globalLangEnum } from '@/enums/globalEnums';
import { locale, i18n } from '@/locales/index';
import { useGlobalConfigOutsideSetup } from '@/store/modules/globalConfigModule';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

/**存储当locale变化时，所有的依赖（函数）会被更新 */
const langChangeCallBackSet = ref<Set<Function>>(new Set());

const addCallBack = (cb: () => void) => {
   langChangeCallBackSet.value.add(cb);
};
const toggleLang = () => {
   if (locale.value === globalLangEnum.en) {
      locale.value = globalLangEnum.zhCN;
   } else {
      locale.value = globalLangEnum.en;
   }
};
export const useLang = () => {
   return {
      locale,
      i18n,
      toggleLang,
      addCallBack
   };
};
export const useT = () => {
   const { t } = useI18n();
   return t;
};
watch(
   () => locale.value,
   (newValue) => {
      i18n.global.locale.value = newValue;
      useGlobalConfigOutsideSetup().setCurrentLang(newValue);
      langChangeCallBackSet.value.forEach((item) => {
         item();
         // console.log(item.name)
         // console.log(item);
      });
      console.log('watch回调函数执行');
   }
);
