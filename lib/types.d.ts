import request from "superagent";
import { Index } from "ts-functional/dist/types";

export declare type IApiConfig = {
    appName: string;
    api: {
        baseUrl: string;
    };
    gallery: {
        maxRowCount: number;
    };
    modules: string[];
    menus: ItemType<MenuItemType>[];
    routes: Array<{
        path: string;
        component: React.ComponentType<any>;
    }>;
};

export type RequestFunc = <T = Record<string, any>>(url: string, bodyOrQuery: T) => request.Request;
export type RequestGenerator = (method: string, apiConfig:IApiConfig) => RequestFunc;

export declare interface IMethods  {
    get: RequestFunc;
    post: RequestFunc;
    put: RequestFunc;
    patch: RequestFunc;
    remove: RequestFunc<undefined>;
}

export declare type Paging = {offset:number, perPage:number};

