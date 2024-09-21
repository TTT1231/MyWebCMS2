import { R } from 'node_modules/vite-plugin-mock/dist/types-b01b7736';

export interface LoginRequestParams {
   account: string;
   password: string;
}

export interface BackRoutesType {
   path: string;
   name: string;
   component: string;
   meta: {
      ishide: boolean;
      ishome: boolean;
   };
   children: BackRoutesType[];
}

export interface RoutesType {
   path: string;
   name: string;
   component: any;
   meta: {
      ishide: boolean;
      ishome: boolean;
   };
   children: RoutesType[];
}
