<script setup lang="ts">
 import type { FormInstance, FormRules } from 'element-plus';
 import { reactive,  useTemplateRef } from 'vue';
 import { LoginState, useLogin } from './useLogin';
 import { computed } from 'vue';
 
 interface RuleForm {
    account: string;
    password: string;
    mobile: string;
 }

 const { getCurrentState, setCurrentState } = useLogin();

 const ruleFormRef=useTemplateRef<FormInstance>('ruleFormRef');

 const isShow = computed(() => {
    if (getCurrentState.value === LoginState.LoginRegister) {
       return true;
    } else {
       return false;
    }
 });
 const handleBack = () => {
   //返回之后重置表单验证状态
   ruleFormRef.value?.resetFields();  
    setCurrentState(LoginState.LoginDefault);
 };
 const ruleForm = reactive<RuleForm>({
    account: '',
    password: '',
    mobile: ''
 });
 const rules = reactive<FormRules<RuleForm>>({
    account: [{ required: true, message: '账号不能为空' }],
    password: [
       { required: true, message: '密码不能为空', trigger: 'blur' },
       { required: true, min: 3, message: '密码必须要大于三位', trigger: 'blur' }
    ],
    mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
 });
 
 const handleRegister = async () => {
    if(!ruleFormRef.value){return;}
    await ruleFormRef.value.validate((valid)=>{
       if(valid){
       
       }
    })
   
 };
 </script>
 
<template>
    <div class="flex flex-col" v-show="isShow">
       <span class=" font-bold text-xl flex justify-center xl:justify-start animate-enterx-faster">{{ $t('login.RegisterTitle') }}</span>
 
       <el-form
          ref="ruleFormRef"
          style="max-width: 400px"
          :model="ruleForm"
          :rules="rules"
          label-width="70px"
          class=" py-4 xl:ml-4 "
       >
          <el-form-item
          :label="$t('login.account')"
             prop="account"
             class=" animate-enterx-medspeed"
          >
             <el-input v-model="ruleForm.account" :placeholder="$t('login.placeholderAccount')" />
          </el-form-item>
          <el-form-item
          :label="$t('login.password')"
             prop="password"
             class="animate-enterx-medspeed"
          >
             <el-input
                type="password"
                v-model="ruleForm.password"
                :placeholder="$t('login.placeholderPassword')"
                show-password
             />
          </el-form-item>
          <el-form-item
          :label="$t('login.phone')"
             prop="mobile"
             class=" animate-enterx-medspeed"
          >
             <el-input
                type="password"
                v-model="ruleForm.mobile"
                :placeholder="$t('login.placeholderPhone')"
                show-password
             />
          </el-form-item>
       </el-form>
       <div>
          <el-button
             type="primary"
             class="w-full  animate-enterx-medspeed ease-out"
             @click="handleRegister"
             >{{ $t('login.RegisterTitle') }}</el-button
          >
       </div>
       <div>
          <el-button
             class="w-full mt-4  animate-enterx-medspeed ease-out"
             @click="handleBack"
             >{{ $t('login.back') }}</el-button
          >
       </div>
    </div>
 </template>
 