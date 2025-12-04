import { IModule } from "@core/lib/module";
import { coreSettings } from "./lib/settings";
import "./lib/registerComponents";
import { ComponentRegistry } from "./lib/layout/componentRegistry";
import { StandardLayout } from "./components/StandardLayout";
import { Content } from "./components/Content";

export const module: IModule = {
    name: "core",
    settings: coreSettings,
};

ComponentRegistry.register("StandardLayout", StandardLayout, { category: "Layouts", displayName: "Standard Layout" });
ComponentRegistry.register("Content", Content, { category: "Layouts", displayName: "Content" });
