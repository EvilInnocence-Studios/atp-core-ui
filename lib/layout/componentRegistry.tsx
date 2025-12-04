import { ISettingDescriptor } from "@common/lib/setting/types";
import { SlotRenderer } from "@core/components/SlotRenderer";
import { Index } from "ts-functional/dist/types";
import { ILayoutComponent } from "./layout";
import { forwardRef } from "react";

// Component Registry

export declare interface IComponentMetadata {
    category?: string;
    icon?: string;
    displayName?: string;
    description?: string;
    props?: Index<ISettingDescriptor>;
    propEditor?: (props: any, updateProps: (props: any) => void) => React.ReactNode;
}

export declare interface IComponentRegistration extends IComponentMetadata {
    name: string;
    component: React.ComponentType<any>;
}

const components: Index<IComponentRegistration> = {};

export const withLayoutMetadata = <P extends object>(
    Component: React.FC<P>,
    metadata: IComponentMetadata & { name: string }
): React.FC<P> => {
    (Component as any).layoutMetadata = metadata;
    return Component;
};

export const ComponentRegistry = {
    register: (nameOrComponent: string | React.FC<any>, component?: React.FC<any>, metadata?: IComponentMetadata) => {
        if (typeof nameOrComponent === 'string') {
            if (!component) return;
            components[nameOrComponent] = {
                name: nameOrComponent,
                component,
                ...metadata
            };
        } else {
            const Comp = nameOrComponent;
            const meta = (Comp as any).layoutMetadata;
            if (meta) {
                components[meta.name] = {
                    component: Comp,
                    ...meta
                };
            }
        }
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
    forwardRef(({ slots, layoutId, dnd, css, ...props }: { slots?: Index<ILayoutComponent[]>, layoutId?: string, dnd?: any, css?: string } & P, ref) => {
        console.log('containerLayoutComponent rendering', { name: Container.displayName || Container.name, hasDnd: !!dnd });
        // We need to merge dnd.ref and forwarded ref?
        // For simplicity, let's assume dnd.ref is what matters for now.
        
        // We render the Container.
        // We inject the handle as the first child.
        // We pass the ref to the Container.
        
        return (
            <Container 
                {...props as unknown as P} 
                ref={dnd?.ref}
                onClick={(e: React.MouseEvent) => {
                    console.log('Container onClick', { dnd });
                    if (dnd?.onSelect) {
                        e.stopPropagation();
                        dnd.onSelect();
                    }
                    (props as any).onClick?.(e);
                }}
            >
                {css && <style>{css}</style>}
                {dnd?.renderUi && dnd.renderUi()}
                {!!props.children && <>{props.children}</>}
                <SlotRenderer 
                    slots={slots?.children} 
                    slotName="children" 
                    parentId={layoutId} 
                    depth={(dnd?.depth ?? -1) + 1} 
                    componentName={Container.displayName || Container.name}
                />
            </Container>
        );
    });
