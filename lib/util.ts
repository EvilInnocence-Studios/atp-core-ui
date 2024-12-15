import request from "superagent";
import { Setter } from "unstateless";

export const getResults = <T>(response:request.Response):T => response.body as T;

export const clear = (...setters:Setter<string>[]) => () => setters.forEach(setter => setter(''));

export const appendTo = <T>(arr:T[]) => (item:T) => [...arr, item];