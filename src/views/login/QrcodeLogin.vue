<script setup lang="ts">
import { LoginState, useLogin } from './useLogin';
import { computed } from 'vue';
const { getCurrentState, setCurrentState } = useLogin();
const isShow = computed(() => {
   if (getCurrentState.value === LoginState.LoginQrcode) {
      return true;
   } else {
      return false;
   }
});
const handleBack = () => {
   setCurrentState(LoginState.LoginDefault);
};
</script>
<template>
    <div v-show="isShow">
        <div class="flex flex-col w-full h-full ">
            <div class=" text-3xl font-bold mb-8 animate-enterx-faster">{{ $t('login.QrCodeLogin') }}</div>
            <div class=" ml-12 animate-enterx-faster ease-in"><AQrcode :size="200"  value="https://localhost:5173"/></div>
            <div class=" mt-4  animate-enterx-medspeed ease-in">{{ $t('login.qrCodeTip') }}</div>
            <AButton @click="handleBack" class=" h-10 mt-4  animate-enterx-medspeed ease-in" type='default'>{{ $t('login.back') }}</AButton>
        </div>
    </div>
</template>