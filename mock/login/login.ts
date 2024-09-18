import { jsonSuccess,jsonFail } from '../_utils';
import {MockMethod} from 'vite-plugin-mock';

// 定义 req 的具体类型,ts-ignore
interface MockRequest {
    body?: Record<string, any>;
    query?: Record<string, string | string[]>;
    headers?: Record<string, string>;
    params?: Record<string, string>;
}

export default [
    {
        url: '/api/user',
        method: 'post',
        timeout:1000,
        response:(request:MockRequest)=>{
            //@ts-ignore
            const {account,password}=request.body;
            if(account==='admin'&&password==='123456'){
               return jsonSuccess({
                userId:1,
                userAccount:'admin',
                userName:'管理员',
                userEmail:'1122334455@123.com',
                userPhone:'123456789',
                userAvatar:'',
                userRole:'ADMIN',
                userCreateTime:'2024-1-1 12:00:00',
                userUpdateTime:'2024-1-1 12:00:00',
                /**后续通过这个token与服务器进行通信 */
                token:'usertoken:2024/09/17 21:50:03'
               });
            }else return jsonFail();
   
            
        }
    }


] as MockMethod[];