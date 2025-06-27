import { prop } from "ts-functional";
import { getMenus, getRoutes, getSettings, IModule } from "./module";
import { IConfig } from "./types";

export const makeConfig = (apiUrl: string, modules:IModule[]) => ():IConfig => ({
    api: {baseUrl: apiUrl},
    modules: modules.map(prop("name")),
    menus: getMenus(modules, "admin"),
    routes: getRoutes(modules, "admin"),
    settings: getSettings(modules),
    paypal: {
        plans: [],
    }
});