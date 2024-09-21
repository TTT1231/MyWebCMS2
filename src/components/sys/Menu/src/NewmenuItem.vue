<script setup lang="ts">
import { SVGHOME } from '@/enums/globalEnums';
import type { MenusType } from '@/types/user';

defineProps({
   item: {
      type: Object as () => MenusType,
      required: true
   }
});
const menuImgHome = `${SVGHOME}/menu`;
</script>
<template>
   <div>
      <a-menu-item v-if="!item.childrens || item.childrens.length === 0" :key="item.path">
         <template #icon>
            <img :src="`${menuImgHome}/${item.icon}.svg`" />
         </template>
         <span class="text-[17px]">{{ $t(item.menuname) }}</span>
      </a-menu-item>
      <a-sub-menu v-else :key="item._submenuid">
         <template #icon>
            <img :src="`${menuImgHome}/${item.icon}.svg`" />
         </template>
         <template #title>
            <span class="text-[17px]">{{ $t(item.menuname) }}</span>
         </template>
         <NewmenuItem v-for="child in item.childrens" :key="child._menuid" :item="child" />
      </a-sub-menu>
   </div>
</template>
