import { Func } from "ts-functional/dist/types";

import React from "react";

// --- Define renderer plugins: (props:P) => React.ReactNode --- //
// --- Ex. export const myPlugins = rendererPlugins<MyProps>(); --- //

type Renderer<P> = Func<P, React.ReactNode>;

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
    return slots.reduce((acc, { plugin }) => {
        const rendered = plugin(props);
        if (rendered) {
            acc.push(rendered);
        }
        return acc;
    }, [] as React.ReactNode[]);
}

export const rendererPlugins = <P>() => {
    const slots = [] as RendererPluginSlots<P>;
    return {
        register: registerRendererPlugin(slots),
        render: render(slots),
    };
}

// --- Define renderer plugins end --- //

const registry: Record<string, any> = {};

export const RendererRegistry = {
    get: <P>(name: string) => {
        if (!registry[name]) {
            registry[name] = rendererPlugins<P>();
        }
        return registry[name] as ReturnType<typeof rendererPlugins<P>>;
    }
};
