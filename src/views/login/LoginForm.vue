<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef } from 'vue';
import { useLogin, LoginState } from './useLogin';
import { FormInstance, type FormRules } from 'element-plus';
import { useGlobalConfigStore } from '@/store/modules/globalConfigModule';
import { getNewMenusApi, getRoutesApi, loginApi } from '@/api/login/login';
import { MessageType, useMessage } from '@/hooks/useMessage';
import { HttpStatusCode } from '@/enums/httpenums';
import { useT, useLang } from '@/hooks/lang/useLang';
import { useUserStore } from '@/store/modules/userModule';
import { useMenusStore } from '@/store/modules/menusModule';
import { useRoutesStore } from '@/store/modules/routesModule';
import { UserInfo } from '@/types/user';
import { router } from '@/router';
import { persistent } from '@/utils/permission/persistent';
import { TOKEN__KEY } from '@/enums/user';
import { useTabsStore } from '@/store/modules/tabsModule';
interface RuleForm {
   account: string;
   password: string;
}
const globalConfigStore = useGlobalConfigStore();
const { getCurrentState, setCurrentState } = useLogin();
const isShow = computed(() => {
   if (getCurrentState.value == LoginState.LoginDefault) {
      return true;
   } else return false;
});

const { createMessage } = useMessage();
const loading = ref(false);
const t = useT();

const ruleFormRef = useTemplateRef<FormInstance>('ruleFormRef');
const ruleForm = reactive<RuleForm>({
   account: 'admin',
   password: '123456'
});

const rules = computed<FormRules<RuleForm>>(() => ({
   account: [{ required: true, message: t('formvalid.account'), trigger: 'blur' }],
   password: [
      { required: true, message: t('formvalid.password'), trigger: 'blur' },
      { min: 3, message: t('formvalid.passwordLength'), trigger: 'blur' }
   ]
}));

const changePhoneLogin = () => {
   setCurrentState(LoginState.LoginMobile);
};
const hanldeQrcodeLogin = () => {
   setCurrentState(LoginState.LoginQrcode);
};
const changeRegister = () => {
   setCurrentState(LoginState.LoginRegister);
};
const formValid = ref(false);

const userStore = useUserStore();
const menusStore = useMenusStore();
const routesStore = useRoutesStore();
const tabsStore=useTabsStore();

//其中UserInfo为null

// console.log(isReactive(testRea))
// watch(()=>testRea.userInfo,(newValue)=>{
//    console.log(newValue)
// },{deep:true})

const handleLogin = async () => {
   if (!ruleFormRef) return;
   await ruleFormRef.value!.validate((valid) => {
      if (valid) {
         formValid.value = true;
      } else {
         formValid.value = false;
      }
   });
   if (formValid.value) {
      //表单验证成功之后
      try {
         loading.value = true;
         const data = await loginApi<UserInfo>({
            account: ruleForm.account,
            password: ruleForm.password
         });
         persistent.setSession(TOKEN__KEY, data.data.token);

         const menus = (await getNewMenusApi({ token: data.data.token })).data;
         console.log(menus);

         let rawRoutes = (await getRoutesApi({ token: data.data.token })).data;
         routesStore.setRoutes(rawRoutes);

         //获取菜单数据，并设置token
    
    
         console.log(menus);
         menusStore.setAllMenus(menus);

         menusStore.setMenus([...menus]);
         tabsStore.setAllTabs(menus);

         if (data.code === HttpStatusCode.OK) {
            userStore.setUserInfo(data.data);
            router.push('/main');
            createMessage({ type: MessageType.success, message: t('message.loginSuccess') });
         } else createMessage({ type: MessageType.error, message: t('message.loginFail') });
      } catch (e) {
      } finally {
         ruleFormRef.value!.resetFields();
         loading.value = false;
      }
   }
};

const { addCallBack } = useLang();
const resetValidata = () => {
   if (ruleFormRef.value) {
      ruleFormRef.value.clearValidate(); // 重置表单验证状态
   }
};
addCallBack(resetValidata);

// watch(()=>locale.value, () => {
//   if (ruleFormRef.value) {
//     ruleFormRef.value.clearValidate(); // 重置表单验证状态
//   }
// });
</script>

<template>
   <div class="px-5 bg-white" v-show="isShow">
      <span
         class="font-bold text-2xl flex justify-center my-5 xl:justify-start xl:-ml-8 animate-enterx-faster"
         >{{ $t('login.DefaultLogin') }}</span
      >

      <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
         <el-form-item prop="account" :label="$t('login.account')" class="animate-enterx-faster">
            <el-input v-model="ruleForm.account" :placeholder="$t('login.placeholderAccount')" />
         </el-form-item>
         <el-form-item
            prop="password"
            :label="$t('login.password')"
            class="animate-enterx-medspeed"
         >
            <el-input
               v-model="ruleForm.password"
               type="password"
               :placeholder="$t('login.placeholderPassword')"
               show-password
            />
         </el-form-item>
      </el-form>
      <div class="flex flex-col gap-4">
         <div class="flex justify-between animate-enterx-medspeed ease-out">
            <el-checkbox
               :label="$t('login.rememberPassword')"
               v-model="globalConfigStore.getRememberPassword as boolean"
            />
            <span class="hover:text-blue-400 hover:cursor-pointer">{{
               $t('login.forgetPassword')
            }}</span>
         </div>
         <AButton
            type="primary"
            class="animate-enterx-medspeed ease-out"
            @click="handleLogin"
            :loading="loading"
            >{{ $t('login.DefaultLogin') }}</AButton
         >
         <div
            class="flex gap-4 flex-col md:flex-row md:[&>*]:w-1/3 animate-enterx-autospeed ease-in-out"
         >
            <AButton @click="changePhoneLogin">{{ $t('login.PhoneLogin') }}</AButton>
            <AButton @click="hanldeQrcodeLogin">{{ $t('login.QrCodeLogin') }}</AButton>
            <AButton @click="changeRegister">{{ $t('login.RegisterTitle') }}</AButton>
         </div>
      </div>
      <el-divider>{{ $t('login.OtherLoginMethods') }}</el-divider>
   </div>
</template>
