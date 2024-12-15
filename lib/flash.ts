import { notification } from "antd";

export const flash = {
    success: (message:string) => () => {notification.success({message})},
    error:   (message:string) => () => {notification.error(  {message})},
    warn:    (message:string) => () => {notification.warning({message})},
    info:    (message:string) => () => {notification.info(   {message})},
}
