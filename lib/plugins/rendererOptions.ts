import { Func } from "ts-functional/dist/types";

// --- Define renderer option plugins: (props:P) => JSX.Element | null --- //
// --- Ex. export const myPlugins = rendererPlugins<MyProps>(); --- //

type Renderer<P> = Func<P, JSX.Element | null>;

export interface IRendererOptionPlugin<P> {
    filter: (props: P) => boolean;
    plugin: Renderer<P>;
}

type RendererPluginSlots<P> = IRendererOptionPlugin<P>[];

const registerRendererPlugin = <P>(slots: RendererPluginSlots<P>) => (plugin: IRendererOptionPlugin<P>) => {
    slots.unshift(plugin);
}

const render = <P>(slots: RendererPluginSlots<P>) => (props: P) => {
    const rendered = slots.find(({ filter }) => filter(props));
    if (rendered) {
        return rendered.plugin(props);
    }
    return null;
}

export const rendererOptionPlugins = <P>(defaultPlugin:Renderer<P> = () => null) => {
    const slots = [{filter: () => true, plugin: defaultPlugin}] as RendererPluginSlots<P>;
    return {
        register: registerRendererPlugin(slots),
        render: render(slots),
    };
}

// --- Define renderer plugins end --- //
