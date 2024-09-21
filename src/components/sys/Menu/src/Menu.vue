<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from './MenuItem.vue';
import { useMenusStore } from '@/store/modules/menusModule';
import { watch } from 'vue';
import { MenusType } from '@/types/user';
import { filterMenusOfIsHide } from '@/utils/menus';
const { isCollapse = false } = defineProps({
   isCollapse: { type: Boolean, required: false }
});
filterMenusOfIsHide;
const menusStore = useMenusStore();
const treedata = ref<MenusType[]>();
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
      <el-menu :collapse="isCollapse" class="w-[224px]" router>
         <MenuItem :treedata="treedata" />
      </el-menu>
   </template>
</template>
