import { notification } from "antd";

export const flash = {
    success: (message:string) => <T>(obj?:T) => {notification.success({message}); return obj;},
    error:   (message:string) => <T>(obj?:T) => {notification.error(  {message}); return obj;},
    warn:    (message:string) => <T>(obj?:T) => {notification.warning({message}); return obj;},
    info:    (message:string) => <T>(obj?:T) => {notification.info(   {message}); return obj;},
}
