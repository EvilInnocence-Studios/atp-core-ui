import { ReactNode } from "react";
import { Func } from "ts-functional/dist/types";

// --- Define renderer option plugins: (props:P) => JSX.Element | null --- //
// --- Ex. export const myPlugins = rendererPlugins<MyProps>(); --- //

type Renderer<P> = Func<P, JSX.Element | ReactNode | null>;

export interface IRendererOptionPlugin<P> {
    priority?: number;
    filter: (props: P) => boolean;
    plugin: Renderer<P>;
}

type RendererPluginSlots<P> = IRendererOptionPlugin<P>[];

const registerRendererPlugin = <P>(slots: RendererPluginSlots<P>) => (plugin: IRendererOptionPlugin<P>) => {
    slots.unshift(plugin);
    slots.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

const render = <P>(slots: RendererPluginSlots<P>, defaultPlugin:Renderer<P>) => (props: P) => {
    for (const slot of slots) {
        if (slot.filter(props)) {
            const element = slot.plugin(props);
            if (element !== null) {
                return element;
            }
        }
    }
    return defaultPlugin(props);
}

export const rendererOptionPlugins = <P>(defaultPlugin:Renderer<P> = () => null) => {
    const slots = [] as RendererPluginSlots<P>;
    return {
        register: registerRendererPlugin(slots),
        render: render(slots, defaultPlugin),
    };
}

// --- Define renderer plugins end --- //
