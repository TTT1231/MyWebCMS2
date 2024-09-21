<script setup lang="ts">
import { IMGHOME, globalLangEnum } from '@/enums/globalEnums';
import { useLang } from '@/hooks/lang/useLang';
import { MessageType, useMessage } from '@/hooks/useMessage';
import { ref } from 'vue';
const reactiableImagePath = `${IMGHOME}/sys/header/translate.png`;
const { createMessage } = useMessage();
const open = ref(false);
const keys = ref<string[]>(['1', '2']);

const { locale, toggleLang, addCallBack } = useLang();
const selectedKeys = ref<string[]>([]);
if (locale.value === globalLangEnum.zhCN) {
   selectedKeys.value[0] = '1';
} else {
   selectedKeys.value[0] = '2';
}
const handleChangeLang = (lang: 'en' | 'zhCN') => {
   if (selectedKeys.value[0] === '1' && lang === 'zhCN') {
      return;
   } else if (selectedKeys.value[0] === '2' && lang === 'en') {
      return;
   } //中文切换英文
   else if (selectedKeys.value[0] === '1') {
      toggleLang();
      selectedKeys.value[0] = '2';
      createMessage({
         message: '语言切换成功',
         type: MessageType.success
      });
   } //英文切换中文
   else {
      toggleLang();
      selectedKeys.value[0] = '1';
      createMessage({
         message: '语言切换成功',
         type: MessageType.success
      });
   }
};
const handleSelectedKeys = () => {
   if (locale.value === globalLangEnum.zhCN) {
      selectedKeys.value[0] = '1';
   } else {
      selectedKeys.value[0] = '2';
   }
};
addCallBack(handleSelectedKeys);
// watch(()=>locale.value,()=>{
//    if(locale.value===globalLangEnum.zhCN){
//       selectedKeys.value[0]='1';
//    }else{
//       selectedKeys.value[0]='2';
//    }
//    }
//    ,{
//       immediate:true
//    }
// )

const handleOpen = () => {
   open.value = true;
};
const handleClose = () => {
   open.value = false;
};
</script>

<template>
   <div
      class="h-full mr-1 hover:cursor-pointer hover:bg-black/20 flex items-center w-8 justify-center"
      @mouseover="handleOpen"
      @mousemove="handleClose"
   >
      <a-dropdown trigger="click" placement="bottom">
         <img :src="reactiableImagePath" class="h-1/2" />
         <template #overlay>
            <a-menu v-model:selected-keys="selectedKeys">
               <a-menu-item :key="keys[0]" @click="handleChangeLang('zhCN')">
                  简体中文(zhCN)
               </a-menu-item>
               <a-menu-item :key="keys[1]" @click="handleChangeLang('en')">
                  English(en)
               </a-menu-item>
            </a-menu>
         </template>
      </a-dropdown>
   </div>
</template>
