<script setup lang="ts">
import LeftMenu from '@/components/sys/Menu';
import { SVGHOME } from '@/enums/globalEnums';
import { watch } from 'vue';
import { ref } from 'vue';
import HeaderRight from '@/components/sys/header/index.vue';
const isCollapse = ref(false);
const collapse = ref(`${SVGHOME}/sys/expand.svg`);
const handleCollapse = () => {
   isCollapse.value = !isCollapse.value;
};
watch(
   () => isCollapse.value,
   () => {
      if (isCollapse.value) {
         collapse.value = `${SVGHOME}/sys/collaspe.svg`;
      } else {
         collapse.value = `${SVGHOME}/sys/expand.svg`;
      }
   }
);
</script>
<template>
   <div class="w-full h-full">
      <ElContainer>
         <LeftMenu v-model:isCollapse="isCollapse" class="select-none" />

         <ElContainer>
            <ElHeader class="border flex flex-col" :style="{ padding: '0px', height: '96px' }">
               <div class="flex flex-row justify-between h-12 items-center">
                  <div
                     class="select-none h-full items-center flex hover:cursor-pointer hover:bg-black/20"
                     @click="handleCollapse"
                  >
                     <img :src="collapse" class="w-8 h-5" />
                  </div>
                  <div><HeaderRight /></div>
               </div>
               <div class="w-full h-12 border">面包屑</div>

               <div class="bg-red-200 py-px">
                  <RouterView />
               </div>
            </ElHeader>
         </ElContainer>
      </ElContainer>
   </div>
</template>
