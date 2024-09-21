<template>
   <div
      class="h-full hover:cursor-pointer hover:bg-black/20 flex items-center w-8 justify-center select-none"
      @click="handleShowDrawer"
   >
      <a-tooltip placement="bottom">
         <template #title>
            <span>{{ $t('header.setting') }}</span>
         </template>
         <img :src="reactiableImagePath" class="h-1/2" />
      </a-tooltip>
      <a-drawer v-model:open="open" title="设置抽屉" placement="right">
         <p>内容填充</p>
         <p>内容填充</p>
         <p>内容填充</p>
      </a-drawer>
   </div>
</template>
<script setup lang="ts">
import { IMGHOME } from '@/enums/globalEnums';
import { ref } from 'vue';
const reactiableImagePath = `${IMGHOME}/sys/header/setting.png`;
const open = ref<boolean>(false);
const handleShowDrawer = () => {
   open.value = true;
};
</script>
