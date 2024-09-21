<script setup lang="ts"></script>
<template>
   <div>
      <template v-for="i in 100" :key="i">
         <div>分析页{{ i }}</div>
      </template>
   </div>
</template>
