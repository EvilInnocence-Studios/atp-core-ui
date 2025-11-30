import { IModule } from "@core/lib/module";
import { coreSettings } from "./lib/settings";
import "./lib/registerComponents";

export const module: IModule = {
    name: "core",
    settings: coreSettings,
};
