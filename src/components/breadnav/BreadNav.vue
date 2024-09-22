<script lang="ts" setup>
import { SVGHOME } from '@/enums/globalEnums';
import { router } from '@/router';
import { useTabsStore } from '@/store/modules/tabsModule';
import { computed } from 'vue';

const closeSVG = `${SVGHOME}/sys/close.svg`;
const closeAniSVG = `${SVGHOME}/sys/closechecked.svg`;

const tabsStore = useTabsStore();
const activeKey =  computed(()=>tabsStore.getCurrentIndex);
const currentTabs = computed(()=>tabsStore.getCurrentTabs);

const changdeSVG = (key: string) => {
   if (activeKey.value === key) {
      return closeAniSVG;
   } else {
      return closeSVG;
   }
};
const handleMouseEnter = (key: string, e: Event) => {
   if (activeKey.value === key) {
      return;
   }
   let img = (e.target as any).firstChild as HTMLImageElement;
   img.src = closeAniSVG;
};
const handleMouseLeave = (key: string, e: Event) => {
   if (activeKey.value === key) {
      return;
   }
   let img = (e.target as any).firstChild as HTMLImageElement;
   img.src = closeSVG;
};
const handleClose = (key:string) => {

   //根据path找到所在数组中index
   tabsStore.deleteCurrentTabs(key);
   if(activeKey.value!==''){
      router.push(activeKey.value);
   }
};
function handleChange(targetKey: any) {
   tabsStore.setCurrentIndex(targetKey as string);
   if(activeKey.value!==''){
      router.push(activeKey.value);
   }
}

// watch(()=>activeKey.value,(newValue)=>{
//     if(newValue===''){return}
//     //第一次
// },{immediate:true})
</script>
<template>
   <div class="ml-4">
      <a-tabs :activeKey="activeKey" :tabBarGutter="22"
       @change="handleChange">
         <template v-for="item in currentTabs">
            <a-tab-pane v-if="item" :key="item.path">
               <template #tab>
                  <div class="flex justify-center">
                     <span>{{ $t(item.title) }}</span>
                     <span
                        class="ml-1"
                        @mouseenter="handleMouseEnter(item.path, $event)"
                        @mouseleave="handleMouseLeave(item.path, $event)"
                     >
                        <img
                           :src="changdeSVG(item.path)"
                           alt="close"
                           class="w-5"
                           @click.stop="handleClose(item.path)"
                        />
                     </span>
                  </div>
               </template>
            </a-tab-pane>
         </template>
      </a-tabs>
   </div>
</template>
<style scoped lang="less"></style>
