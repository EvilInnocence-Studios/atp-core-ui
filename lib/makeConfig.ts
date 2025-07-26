import { prop } from "ts-functional";
import { AppType, getMenus, getRoutes, getSettings, IModule } from "@core/lib/module";
import { IConfig } from "./types";

export const makeConfig = (apiUrl: string, modules:IModule[], appType:AppType) => ():IConfig => ({
    api: {baseUrl: apiUrl},
    modules: modules.map(prop("name")),
    menus: getMenus(modules, appType),
    routes: getRoutes(modules, appType),
    settings: getSettings(modules),
});