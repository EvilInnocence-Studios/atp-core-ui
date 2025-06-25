import { Func } from "ts-functional/dist/types";

// --- Define transformation plugins: (object:T) => T --- //
// --- Ex. export const myTransformers = transformerPlugins<MyObject>(); --- //

type Transformer<T> = Func<T, T>;

interface ITransformerPlugin<T> {
    priority: number;
    plugin: Transformer<T>;
}

type TransformerPluginSlots<T> = ITransformerPlugin<T>[];

const registerTransformerPlugin = <T>(slots: TransformerPluginSlots<T>) => (priority: number, plugin: Transformer<T>) => {
    slots.push({ priority, plugin });
    slots.sort((a, b) => b.priority - a.priority);
}

const transform = <T>(slots: TransformerPluginSlots<T>) => (object: T) => {
    return slots.reduce((obj, plugin) => plugin.plugin(obj), object);
}

export const transformerPlugins = <T>() => {
    const slots = {} as TransformerPluginSlots<T>;
    return {
        register: registerTransformerPlugin(slots),
        transform: transform(slots),
    };
}

// --- Define transformation plugins end --- //