import request from "superagent";
import { pipe, prop } from "ts-functional";
import { Setter } from "unstateless";
import { flash } from "./flash";

export const getResults = <T>(response:request.Response):T => response.body as T;
export const getError = (e:any) => e.response?.body || e;
export const execute = <T>(fn:() => T) => fn();
export const handleError = pipe(getError, prop("message"), flash.error, execute)

export const clear = (...setters:Setter<string>[]) => () => setters.forEach(setter => setter(''));

export const appendTo = <T>(arr:T[]) => (item:T) => [...arr, item];

export const stopProp = {
    onClick: (e:React.MouseEvent) => e.stopPropagation(),
}