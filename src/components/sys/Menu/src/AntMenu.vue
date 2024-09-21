<script setup lang="ts">
import { ref } from 'vue';
import NewmenuItem from './NewmenuItem.vue';
import { MenusType } from '@/types/user';
import { useT } from '@/hooks/lang/useLang';
import { SVGHOME } from '@/enums/globalEnums';
// import {filterMenusOfIsHide} from '@/utils/menus'

// import { useMenusStore } from '@/store/modules/menusModule';
// import { watch } from 'vue';
const { isCollapse = false } = defineProps({
   isCollapse: {
      type: Boolean,
      required: false
   }
});

const userImgPath = `${SVGHOME}/sys/user.svg`;

// const menuStore=useMenusStore();
const openKeys = ref<string[]>([]);

const treedata = ref<MenusType[]>([]);

const t = useT();
// watch(()=>isCollapse,()=>{
//   console.log(isCollapse)
// },{immediate:true})
// watch(()=>menuStore,()=>{
//     if(menuStore.getMenus){
//         let menus=menuStore.getMenus;
//         treedata.value=filterMenusOfIsHide(menus);
//     }
// },{immediate:true})
</script>
<template>
   <el-aside :width="isCollapse ? '64px' : '224px'" class="h-screen">
      <el-scrollbar class="w-[224px]">
         <div class="flex flex-row hover:cursor-pointer border select-none h-12">
            <img :src="userImgPath" alt="用户" class="w-14 h-11" />
            <span class="my-auto text-xl font-bold text-blue-500/90" v-if="!isCollapse">{{
               t('common.MySystemName')
            }}</span>
         </div>
         <a-menu v-model:open-keys="openKeys" mode="inline">
            <NewmenuItem v-for="item in treedata" :key="item._menuid" :item="item" />
         </a-menu>
      </el-scrollbar>
   </el-aside>
</template>
<style scoped lang="less">
.el-aside {
   overflow-x: hidden;
   overflow-y: auto;
   text-align: left;
   cursor: pointer;
   transition: width 0.2s linear;
}
</style>
