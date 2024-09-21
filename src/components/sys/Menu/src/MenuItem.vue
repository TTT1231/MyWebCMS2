<script setup lang="ts">
import { SVGHOME } from '@/enums/globalEnums';
import { MenusType } from '@/types/user';

const props = defineProps({
   treedata: {
      type: Array as () => MenusType[],
      required: true
   }
});
const menuImgHome = `${SVGHOME}/menu`;
</script>
<template>
   <template v-for="item in props.treedata">
      <el-sub-menu
         :index="item._submenuid"
         v-if="item.childrens.length > 0 && item.menutype === 'tree'"
      >
         <template #title>
            <!-- <el-icon v-if="item.iconpath!==''">
               <component :is="item.iconpath"></component>
            </el-icon>  -->
            <!-- 内部有absolute布局，解决抖动问题 -->
            <!-- <el-icon v-if="item.iconpath !== ''">
               <img :src="formatIconPath(item.iconpath)" class="select-none" />
            </el-icon> -->
            <el-icon v-if="item.icon !== ''">
               <img :src="`${menuImgHome}/${item.icon}.svg`" class="select-none w-6 h-14" />
            </el-icon>

            <span class="select-none ml-4"> {{ $t(item.menuname) }}</span>
         </template>
         <MenuItem :treedata="item.childrens" />
      </el-sub-menu>
      <el-menu-item :index="item.path" v-if="item.menutype === 'node'">
         <template #title>
            <img
               v-if="item.icon !== ''"
               :src="`${menuImgHome}/${item.icon}.svg`"
               class="select-none el-icon"
            />
            <span class="select-none">{{ $t(item.menuname) }}</span></template
         >
      </el-menu-item>
   </template>
</template>
