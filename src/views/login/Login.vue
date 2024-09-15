<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';
import LoginPhone from './LoginPhone.vue'
import LoginRegister from './LoginRegister.vue';
import QrcodeLogin from './QrcodeLogin.vue'
import { useLang } from '@/hooks/lang/useLang';
import { SVGHOME } from '@/enums/globalEnums';

const {toggleLang}=useLang();
const lang=ref(false);
const sweatsPlach=`${SVGHOME}/login/SweatsPlach.svg`;
const atomElectron=`${SVGHOME}/login/AtomElectron.svg`
</script>
<template>
    <div class="h-screen w-full relative">
        <div class=" absolute right-4">
            <a-switch v-model:checked="lang" checked-children="en" un-checked-children="中"
             @change="toggleLang"/>
        </div>
        <div class="md: bg-gray-700  xl:bg-white xl:py-0  h-full  py-4">
            <div class="flex h-full md:w-full">
                <div class="  hidden min-h-full xl:flex xl:flex-col xl:w-6/12 bg-blue-500/50 xl:h-full">
                    <div class=" w-2/3 h-full xl:ml-20 xl:flex xl:flex-col">
                        <div class=" flex w-full bg-white-400 mt-10 h-28 -animate-enterx-faster ease-in">
                            <div><img :src="atomElectron" alt="电子与原子图片" class=" w-full h-full"/></div>
                            <div class=" text-3xl text-white mt-10 ml-1">My Admin</div>
                        </div>
                        <div class=" w-full h-2/5 -animate-enterx-faster">
                            <img :src="sweatsPlach" role="img" class=" w-full h-full" alt="水滴"/>
                        </div>
                        <div class=" text-white text-3xl mt-8 -animate-enterx-faster ease-in">{{ $t('login.startTip') }}</div>
                        <div class=" text-white text-2xl mt-4  -animate-enterx-medspeed ease-in">{{ $t('login.startTipInput') }}</div>
                    </div>
                    
                    
                </div>
                <div class="  flex w-full h-full  xl:w-6/12 py-16 ">
                    <div  class=" w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 md:w-3/5   sm:px-4  xl:shadow-none sm:w-3/4 lg:w-[45%] bg-white xl:w-3/5">
                        <LoginForm />
                        <LoginPhone/>
                        <LoginRegister/>
                        <QrcodeLogin/>
                    </div> 
                   
                </div>
            </div>
    </div>
    </div>
</template>
<style scoped lang="less">

</style>