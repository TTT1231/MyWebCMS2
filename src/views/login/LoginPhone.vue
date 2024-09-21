<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef } from 'vue';
import { useLogin, LoginState } from './useLogin';
import { FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { getCurrentState, setCurrentState } = useLogin();
const isShow = computed(() => {
   if (getCurrentState.value == LoginState.LoginMobile) {
      return true;
   } else return false;
});
//返回
const handleBack = () => {
   setCurrentState(LoginState.LoginDefault);
};
const ruleFormRef = useTemplateRef<FormInstance>('ruleFormRef');

interface RuleForm {
   mobile: string;
   vaildcode: string;
}
const ruleForm = reactive<RuleForm>({
   mobile: '',
   vaildcode: ''
});

const rules = reactive<FormRules<RuleForm>>({
   mobile: [{ required: true, message: () => t('login.placeholderPhone'), trigger: 'blur' }],
   vaildcode: [{ required: true, message: () => t('login.placeholderPhoneCode'), trigger: 'blur' }]
});

const start = ref(false);
const countdown = ref(10);
const countdownTip = computed(() => {
   if (start.value) {
      return countdown.value + ' s ' + t('login.phoneCode');
   } else return t('login.phoneCode');
});

const countdownHandle = () => {
   start.value = true;
   ruleForm.vaildcode = '123456';
   let timer = setInterval(() => {
      if (countdown.value > 0) {
         countdown.value--;
      } else {
         start.value = false;
         clearInterval(timer);
         countdown.value = 10;
         ruleForm.vaildcode = '';
      }
   }, 1000);
};
</script>

<template>
   <div class="px-5 bg-white" v-show="isShow">
      <span
         class="font-bold text-2xl flex justify-center my-5 xl:justify-start xl:-ml-8 animate-enterx-faster"
      >
         {{ $t('login.PhoneLogin') }}</span
      >

      <el-form
         ref="ruleFormRef"
         :model="ruleForm"
         :rules="rules"
         label-width="70px"
         class="xl:mt-8"
      >
         <el-form-item prop="mobile" :label="$t('login.phone')" class="animate-enterx-faster">
            <el-input v-model="ruleForm.mobile" :placeholder="$t('login.placeholderPhone')" />
         </el-form-item>
         <el-form-item
            prop="vaildcode"
            :label="$t('login.phoneCode')"
            class="animate-enterx-medspeed"
         >
            <div class="flex">
               <el-input
                  type="text"
                  v-model="ruleForm.vaildcode"
                  :placeholder="$t('login.placeholderPhoneCode')"
               />
               <el-button round @click="countdownHandle" :disabled="start" class="ml-5 w-1/3">{{
                  countdownTip
               }}</el-button>
            </div>
         </el-form-item>
      </el-form>
      <div class="flex flex-col gap-4">
         <AButton type="primary" class="animate-enterx-medspeed ease-out mt-4">{{
            $t('login.DefaultLogin')
         }}</AButton>
         <AButton type="default" class="animate-enterx-medspeed ease-out" @click="handleBack">{{
            $t('login.back')
         }}</AButton>
      </div>
   </div>
</template>
