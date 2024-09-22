<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from './MenuItem.vue';
import { useMenusStore } from '@/store/modules/menusModule';
import { watch } from 'vue';
import { MenusType } from '@/types/user';
import { filterMenusOfIsHide } from '@/utils/menus';
import { useTabsStore } from '@/store/modules/tabsModule';

const { isCollapse = false } = defineProps({
   isCollapse: { type: Boolean, required: false }
});

const menusStore = useMenusStore();
const treedata = ref<MenusType[]>();
const tabsStore=useTabsStore();
//菜单激活时的回调
const handleSelect=(index:string)=>{
   tabsStore.addCurrentTabs(index);
}
watch(
   () => menusStore.menus,
   (newValue) => {
      if (newValue) {
         treedata.value = filterMenusOfIsHide(newValue);
      }
   },
   { immediate: true }
);
</script>
<template>
   <template v-if="treedata">
      <el-menu :collapse="isCollapse" class="w-[224px]"
      @select="handleSelect"
      router>
         <MenuItem :treedata="treedata" />
      </el-menu>
   </template>
</template>
