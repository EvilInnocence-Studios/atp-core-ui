import { notification } from "antd";

export const flash = {
    success: (message:string) => <T>(obj?:T) => {notification.success({message, duration: 2}); return obj;},
    error:   (message:string) => <T>(obj?:T) => {notification.error(  {message, duration: 5}); return obj;},
    warn:    (message:string) => <T>(obj?:T) => {notification.warning({message, duration: 3}); return obj;},
    info:    (message:string) => <T>(obj?:T) => {notification.info(   {message, duration: 2}); return obj;},
}
