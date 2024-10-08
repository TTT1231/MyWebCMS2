import { defineStore } from 'pinia';
import type { UserInfo } from '@/types/user';
//用户登录之后，信息存储
export const useUserStore = defineStore('user', {
   state: (): {
      userInfo: UserInfo | null;
   } => ({
      userInfo: null
   }),
   getters: {
      getUserInfo: (state) => state.userInfo
   },
   actions: {
      setUserInfo(userInfo: UserInfo) {
         this.userInfo = userInfo;
         setTimeout(() => {
            this.userInfo!.userId = 2;
         }, 1000);
      },
      clearUserInfo() {
         this.userInfo = null;
      }
   },
   persist: false
});
