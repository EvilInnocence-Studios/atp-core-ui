import request from "superagent";
import { Index } from "ts-functional/dist/types";

export declare type IApiConfig = {
    appName: string;
    api: {
        baseUrl: string;
    };
    analytics: {
        google: string;
        track: string;
        debug: boolean;
    };
    gallery: {
        maxRowCount: number;
    };
    social: {
        twitter: string;
        blueSky: string;
        instagram: string;
    }
    modules: string[];
    menus: ItemType<MenuItemType>[];
    paypal: {
        clientId: string;
        plans: Index<string>;
    };
    routes: Array<{
        path: string;
        component: React.ComponentType<any>;
    }>;
};

export type RequestFunc = <T>(url: string, bodyOrQuery: T) => request.Request;
export type RequestGenerator = (method: string, apiConfig:IApiConfig) => RequestFunc;

export declare interface IMethods  {
    get: RequestFunc<Record<string, any>>;
    post: RequestFunc<Record<string, any>>;
    put: RequestFunc<Record<string, any>>;
    patch: RequestFunc<Record<string, any>>;
    remove: RequestFunc<undefined>;
}

export declare type Paging = {offset:number, perPage:number};

