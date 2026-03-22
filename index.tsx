import { Content } from "@core/components/Content";
import { IModule } from "@core/lib/module";
import { ComponentRegistry } from "@theming/lib/layout/componentRegistry";
import { coreSettings } from "./lib/settings";
import { YouTube } from "./components/YouTube";

export const module: IModule = {
    name: "core",
    settings: coreSettings,
};

ComponentRegistry.register("Content", Content, { category: "Content", displayName: "Page Content" });
ComponentRegistry.register(YouTube);