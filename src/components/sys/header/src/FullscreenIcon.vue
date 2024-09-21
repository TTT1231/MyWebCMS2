<template>
   <div
      class="h-full hover:cursor-pointer hover:bg-black/20 flex items-center w-8 justify-center"
      @click="handleFullScreen"
   >
      <a-tooltip placement="bottom">
         <template #title>
            <span>{{ $t('header.fullscreen') }}</span>
         </template>
         <img :src="reactiableImagePath" class="h-1/2" />
      </a-tooltip>
   </div>
</template>
<script setup lang="ts">
import { IMGHOME } from '@/enums/globalEnums';
import { useFullscreen } from '@vueuse/core';
const reactiableImagePath = `${IMGHOME}/sys/header/fullscreen.png`;
const { toggle } = useFullscreen();
const handleFullScreen = () => {
   toggle();
};
</script>
