<script setup lang="ts">
import { IMGHOME } from '@/enums/globalEnums';

const notify = `${IMGHOME}/sys/notify.png`;
const fullscreen = `${IMGHOME}/sys/fullscreen.png`;
const translate = `${IMGHOME}/sys/translate.png`;
const setting = `${IMGHOME}/sys/setting.png`;
</script>
<template>
   <div class="flex flex-row h-full">
      <div class="hover:bg-black/20 h-12 w-8"><img :src="notify" class="w-8 h-6" /></div>
      <div><img :src="fullscreen" class="w-6 h-6" /></div>
      <div><img :src="translate" class="w-6 h-6" /></div>
      <div class="w-20 bg-red-300"></div>
      <div><img :src="setting" class="w-6 h-6" /></div>
   </div>
</template>
