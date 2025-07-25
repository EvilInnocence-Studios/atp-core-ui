import { ISettingContainer } from "@common/lib/setting/types";
import request from "superagent";
import { Index } from "ts-functional/dist/types";

export declare type IConfig = {
    api: {
        baseUrl: string;
    };
    modules: string[];
    menus: ItemType<MenuItemType>[];
    routes: Array<{
        path: string;
        component: React.ComponentType<any>;
    }>;
    settings: ISettingContainer;
};

export type RequestFunc = <T>(url: string, bodyOrQuery: T) => request.Request;
export type RequestGenerator = (method: string, apiConfig:IConfig) => RequestFunc;

export declare interface IMethods  {
    get: RequestFunc<Record<string, any>>;
    post: RequestFunc<Record<string, any>>;
    put: RequestFunc<Record<string, any>>;
    patch: RequestFunc<Record<string, any>>;
    remove: RequestFunc<undefined>;
}

export declare type Paging = {offset:number, perPage:number};

