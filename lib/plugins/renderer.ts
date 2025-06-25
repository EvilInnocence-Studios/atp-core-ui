import { Func } from "ts-functional/dist/types";

// --- Define renderer plugins: (props:P) => JSX.Element | null --- //
// --- Ex. export const myPlugins = rendererPlugins<MyProps>(); --- //

type Renderer<P> = Func<P, JSX.Element | null>;

interface IRendererPlugin<P> {
    priority: number;
    plugin: Renderer<P>;
}

type RendererPluginSlots<P> = IRendererPlugin<P>[];

const registerRendererPlugin = <P>(slots: RendererPluginSlots<P>) => (priority: number, plugin: Renderer<P>) => {
    slots.push({ priority, plugin });
    slots.sort((a, b) => b.priority - a.priority);
}

const render = <P>(slots: RendererPluginSlots<P>) => (props: P) => {
    return slots.map(plugin => plugin.plugin(props)).flat();
}

export const rendererPlugins = <P>() => {
    const slots = {} as RendererPluginSlots<P>;
    return {
        register: registerRendererPlugin(slots),
        render: render(slots),
    };
}

// --- Define renderer plugins end --- //
