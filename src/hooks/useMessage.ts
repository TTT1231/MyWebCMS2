import { message } from "ant-design-vue"

//静态方法的封装

export enum MessageType{
    success='success',
    error='error',
    warning='warning',
}
export interface MessageConfig{
    message:string,
    type:MessageType,
    duration?:number
}

export const createMessage=(config:Omit<MessageConfig,'duration'>,duration:number=1)=>{
    switch (config.type){
        case MessageType.success:
            message.success({ content:config.message,duration:duration });
            break;
        case MessageType.error:
            message.error({ content:config.message,duration:duration });
            break;
        case MessageType.warning:
            message.warning({ content:config.message,duration:duration });
            break;
    }
    return;
}
export const useMessage=()=>{
    return {
        createMessage
    }
}