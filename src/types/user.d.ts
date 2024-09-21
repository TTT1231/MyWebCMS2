import { Role } from '@/enums/user';

export interface UserInfo {
   userId: number;
   userAccount: string;
   userName: string;
   userEmail: string;
   userPhone: string;
   userAvatar: string;
   userRole: string;
   userCreateTime: string;
   userUpdateTime: string;
   token: string;
}
export interface AuthMenus {
   _id: number;
   user_id: number;
   menuname: string;
   menutype: string;
   parent_id: number;
   iconpath: string;
   path: string;
   isHiden: Boolean;
   childrens: AuthMenus[];
}

type SingleRole = keyof typeof Role;
export type RoleArray = SingleRole[];

export interface MenusType {
   _menuid: number;
   _submenuid: string;
   menuname: string;
   menutype: 'tree' | 'node';
   parent_id: number;
   icon: string;
   path: string;
   role: SingleRole[];
   ishide: Boolean;
   childrens: MenusType[];
}
