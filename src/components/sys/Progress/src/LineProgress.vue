<script setup lang="ts">
import { useProgress } from '@/hooks/sys/useProgress';
const { isStart, percentage } = useProgress();
</script>
<template>
   <div>
      <el-progress
         v-if="isStart"
         :striped="true"
         :striped-flow="true"
         :percentage="percentage"
         :show-text="false"
         :stroke-width="4"
      >
         <label></label>
      </el-progress>
   </div>
</template>
