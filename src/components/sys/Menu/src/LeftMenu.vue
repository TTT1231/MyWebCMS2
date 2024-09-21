<script setup lang="ts">
import Menu from './Menu.vue';
import { SVGHOME } from '@/enums/globalEnums';
const userImgPath = `${SVGHOME}/sys/user.svg`;
const { isCollapse = false } = defineProps({
   isCollapse: {
      type: Boolean,
      required: false
   }
});
</script>
<template>
   <el-aside :width="isCollapse ? '64px' : '224px'" class="h-screen">
      <el-scrollbar class="w-[224px]">
         <div class="flex flex-row hover:cursor-pointer border select-none h-12">
            <img :src="userImgPath" alt="用户" class="w-14 h-11" />
            <span class="my-auto" v-if="!isCollapse">My Web CMS</span>
         </div>
         <Menu :isCollapse="isCollapse" />
      </el-scrollbar>
   </el-aside>
</template>
<style scoped>
.el-aside {
   overflow-x: hidden;
   overflow-y: auto;
   text-align: left;
   cursor: pointer;
   transition: width 0.2s linear;
}
</style>
