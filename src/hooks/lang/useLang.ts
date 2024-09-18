import { globalLangEnum } from '@/enums/globalEnums';
import {locale,i18n} from '@/locales/index'
import {useI18n} from 'vue-i18n'
const toggleLang=()=>{
    console.log('这里发送了变化')
   if( locale.value===globalLangEnum.en){
    locale.value=globalLangEnum.zhCN;
   }else{
    locale.value=globalLangEnum.en;
   }
}
export const useLang=()=>{
    return{
        locale,i18n,toggleLang
    }
}
export const useT=()=>{
    const { t } = useI18n()
    return t
}