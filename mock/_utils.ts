export function jsonSuccess(data:Object,message='成功'):JsonReturn<any>{
    return{
        code:200,
        message:message,
        data:data
    }
}

export function jsonFail(message='失败'){
    return{
        code:404,
        message:message,
   
    }
}