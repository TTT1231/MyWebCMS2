import { LoginRequestParams, BackRoutesType } from '@/types/login';
import { AuthMenus, MenusType, UserInfo } from '@/types/user';
import { defhttps } from '@/utils/https/index';

type Token = Pick<UserInfo, 'token'>;
enum LoginApi {
   ACCOUNT_LOGIN = '/api/user',
   AUTHMENUS = '/api/authmenus',
   AUTHMENUSNEW = '/api/authmenusnew',
   GETROUTES = '/api/getRoutes'
}
/**
 *
 * @template T 返回值类型，为JsonReturn<T>
 * @template D 请求参数类型，默认为LoginRequestParams
 */
export function loginApi<T = any>(params: LoginRequestParams) {
   return defhttps
      .postRequest<JsonReturn<T>, LoginRequestParams>({
         data: params,
         url: `${LoginApi.ACCOUNT_LOGIN}`
      })
      .then((res) => res.data);
}

//登录成功后token进行通信
export function getMenusApi(params: Token) {
   return defhttps
      .postRequest<JsonReturn<AuthMenus[]>, Token>({
         data: params,
         url: `${LoginApi.AUTHMENUS}`
      })
      .then((res) => res.data);
}

export function getNewMenusApi(params: Token) {
   return defhttps
      .postRequest<JsonReturn<MenusType[]>, Token>({
         data: params,
         url: `${LoginApi.AUTHMENUSNEW}`
      })
      .then((res) => res.data);
}

export function getRoutesApi(params: Token) {
   return defhttps
      .postRequest<JsonReturn<BackRoutesType[]>, Token>({
         data: params,
         url: `${LoginApi.GETROUTES}`
      })
      .then((res) => res.data);
}
