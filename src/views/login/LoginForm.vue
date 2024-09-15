<script setup lang="ts">
import { computed,reactive,ref,useTemplateRef } from 'vue';
import { useLogin,LoginState } from './useLogin';
import { FormInstance,type FormRules } from 'element-plus';
import {  useGlobalConfigStore } from '@/store/modules/globalConfigModule';

interface RuleForm {
   account: string;
   password: string;
}
const globalConfigStore=useGlobalConfigStore()
const {getCurrentState,setCurrentState}=useLogin();
const isShow = computed(()=>{
   if(getCurrentState.value==LoginState.LoginDefault){
      return true;
   }
   else return false;
})
const ruleFormRef=useTemplateRef<FormInstance>('ruleFormRef');
const ruleForm = reactive<RuleForm>({
   account: 'admin',
   password: '123456'
});

const rules = reactive<FormRules<RuleForm>>({
   account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
   password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 3, message: '密码需要在三位以上', trigger: 'blur' }
   ]
});

const changePhoneLogin=()=>{
   setCurrentState(LoginState.LoginMobile);
}
const hanldeQrcodeLogin=()=>{
   setCurrentState(LoginState.LoginQrcode);
}
const changeRegister=()=>{
   setCurrentState(LoginState.LoginRegister);
}
const formValid=ref(false);
const handleLogin=async ()=>{
   if(!ruleFormRef) return;
   await ruleFormRef.value!.validate((valid)=>{
      if (valid) {
         formValid.value = true;
      } else {
         formValid.value = false;
      }
   })
   if(formValid.value){
      //表单验证成功之后
   }
}
</script>

<template>
   <div class=" px-5 bg-white" v-show="isShow">
      <span class="font-bold text-2xl flex justify-center my-5 xl:justify-start xl:-ml-8 animate-enterx-faster">{{$t('login.DefaultLogin')}}</span>

      <el-form ref="ruleFormRef"
      :rules="rules"
      :model="ruleForm"
      >
         <el-form-item
         prop="account"
         :label="$t('login.account')" class=" animate-enterx-faster">
            <el-input v-model="ruleForm.account" :placeholder="$t('login.placeholderAccount')" />
         </el-form-item>
         <el-form-item 
         prop="password"
         :label="$t('login.password')" class=" animate-enterx-medspeed">
            <el-input v-model="ruleForm.password" type="password" :placeholder="$t('login.placeholderPassword')" show-password />
         </el-form-item>
      </el-form>
      <div class="flex flex-col gap-4" >
         <div class="flex justify-between animate-enterx-medspeed ease-out">
            <el-checkbox :label="$t('login.rememberPassword')" v-model="globalConfigStore.getRememberPassword as boolean" />
            <span class=" hover:text-blue-400 hover:cursor-pointer">{{ $t('login.forgetPassword') }}</span>
         </div>
         <AButton type='primary' class=" animate-enterx-medspeed ease-out" @click="handleLogin">{{$t('login.DefaultLogin')}}</AButton>
         <div class="flex gap-4 flex-col md:flex-row md:[&>*]:w-1/3 animate-enterx-autospeed ease-in-out">
            <AButton @click="changePhoneLogin" >{{$t('login.PhoneLogin')}}</AButton>
            <AButton @click="hanldeQrcodeLogin">{{$t('login.QrCodeLogin')}}</AButton>
            <AButton  @click="changeRegister">{{$t('login.RegisterTitle')}}</AButton>
         </div>

      </div>
      <el-divider>{{$t('login.OtherLoginMethods')}}</el-divider>
   </div>
</template>
