import { notification } from "antd";

export const flash = {
    success: (message:string) => () => {notification.success({message, duration: 2})},
    error:   (message:string) => () => {notification.error(  {message, duration: 5})},
    warn:    (message:string) => () => {notification.warning({message, duration: 3})},
    info:    (message:string) => () => {notification.info(   {message, duration: 2})},
}
