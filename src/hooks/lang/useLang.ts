import { globalLangEnum } from '@/enums/globalEnums';
import {locale,i18n} from '@/locales/index'
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