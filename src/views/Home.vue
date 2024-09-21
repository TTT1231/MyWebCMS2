<script setup lang="ts">
import { useGlobalConfigStore } from '@/store/modules/globalConfigModule';
import { locale } from '@/locales/index';
const globalConfigStore = useGlobalConfigStore();
const handleChangeLang = () => {
   locale.value = 'zhCN';
};
</script>
<template>
   <!-- {{  globalConfigStore.lang}} -->
   <div class="qwe">你好</div>
   <ElButton type="primary">阿三大苏打</ElButton>
   <AButton type="primary">antd中按钮</AButton>
   <span class="bg-purple-500">下面测试taildwindcss</span>
   <div>
      测试国际化:
      {{ $t('namespace1.gret1') }}
   </div>
   <AButton type="primary" @click="handleChangeLang">切换语言</AButton>
</template>
<style scoped lang="less">
@nihao: #ed1111;
.qwe {
   background: @nihao;
}
</style>
