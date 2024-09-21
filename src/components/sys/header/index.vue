<script setup lang="ts">
import NotifyIcon from './src/notifyicon/index';
import TranslateIcon from './src/TranslateIcon.vue';
import FullscreenIcon from './src/FullscreenIcon.vue';
import SettingIcon from './src/SettingIcon.vue';
</script>
<template>
   <div class="w-72 h-11 flex items-center select-none">
      <NotifyIcon />
      <FullscreenIcon />
      <TranslateIcon />
      <div class="w-[140px] flex h-full justify-center bg-red-300 items-center select-none">
         用户界面
      </div>
      <SettingIcon />
   </div>
</template>
