import { ISettingDescriptor } from "@common/lib/setting/types";
import { SlotRenderer } from "@core/components/SlotRenderer";
import { Index } from "ts-functional/dist/types";
import { ILayoutComponent } from "./layout";

// Component Registry

export declare interface IComponentMetadata {
    category?: string;
    icon?: string;
    displayName?: string;
    description?: string;
    props?: Index<ISettingDescriptor>;
}

export declare interface IComponentRegistration extends IComponentMetadata {
    name: string;
    component: React.FC;
}

const components: Index<IComponentRegistration> = {};

export const ComponentRegistry = {
    register: (name: string, component: React.FC<any>, metadata?: IComponentMetadata) => {
        components[name] = {
            name,
            component,
            ...metadata
        };
    },
    get: (name: string): IComponentRegistration | undefined =>
        components[name],
    getAll: (): Index<IComponentRegistration> =>
        components,
    getCategories: (): Set<string> =>
        new Set(Object.values(components)
            .map(({ category }) => category)
            .filter((category) => category !== undefined)),
    byCategory: (selectedCategory: string): IComponentRegistration[] =>
        Object.values(components)
            .filter(({ category }) => category === selectedCategory),
    bySearch: (search: string): IComponentRegistration[] =>
        Object.values(components)
            .filter(({ displayName }) => displayName?.toLowerCase().includes(search.toLowerCase())),
}

export const containerLayoutComponent = <P extends {children?: any}>(Container: React.ComponentType<P>) =>
    ({ slots, ...props }: { slots: Index<ILayoutComponent[]> } & P) => <Container {...props as unknown as P}>
        {!!props.children && <>{props.children}</>}
        {!!slots && <SlotRenderer slots={slots.children} />}
    </Container>;
