import { LoginRequestParams } from '@/types/login';
import {defhttps} from '@/utils/https/index';

enum LoginApi {
    ACCOUNT_LOGIN = '/api/user',
    AUTHMENUS = '/api/authmenus'
 }
 /**
  * 
  * @template T 返回值类型，为JsonReturn<T>
  * @template D 请求参数类型，默认为LoginRequestParams
  */
 export function loginApi<T=any>(params:LoginRequestParams){
    return defhttps.postRequest<JsonReturn<T>,LoginRequestParams>({
      data:params,
      url:`${LoginApi.ACCOUNT_LOGIN}`
    }).then(res=>res.data);
    
 }