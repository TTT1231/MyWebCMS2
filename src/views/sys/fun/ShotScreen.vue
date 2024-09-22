<script setup lang="ts">
import { ref } from 'vue';
import html2canvas from 'html2canvas';
import { useTemplateRef } from 'vue';
const onlyonce=ref<boolean>(false);
const screenshot=ref('');
const body=useTemplateRef<HTMLDivElement>('divRef');

const handleShotScreen=async()=>{
   if(body.value){
      const clientHeight = body.value.clientHeight;  
      const clientWidth = body.value.clientWidth;  
      const canvas = await html2canvas(body.value, { scale: 4,
      width:clientWidth*4,
      height:clientHeight*4
      });
      screenshot.value = canvas.toDataURL('image/png', 1);
      onlyonce.value = true;
      console.log(screenshot.value);

      const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'screenshot.png';
        link.click();
   }
  
}
</script>
<template>
   <div class=" flex flex-row" >
      <div class=" w-16" ref="divRef" >
         <template v-for="i in 100" :key="i">
         <div>截图{{ i }}</div>
      </template> 
      </div>
      <AButton @click="handleShotScreen" type='primary'>截图</AButton>
      <template v-if="onlyonce">
         <div class=" w-full h-full">
            <img v-if="onlyonce" :src="screenshot" alt="shotScreen"/>
         </div>
      </template>
   </div>
</template>
