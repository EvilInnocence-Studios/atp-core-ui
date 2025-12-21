import { Content } from "@core/components/Content";
import { IModule } from "@core/lib/module";
import { ComponentRegistry } from "@theming/lib/layout/componentRegistry";
import { coreSettings } from "./lib/settings";

export const module: IModule = {
    name: "core",
    settings: coreSettings,
};

ComponentRegistry.register("Content", Content, { category: "Layouts", displayName: "Content" });
