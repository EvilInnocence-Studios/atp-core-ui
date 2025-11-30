import { ComponentRegistry } from "@core/lib/layout/componentRegistry";
import { overridable } from "@core/lib/overridable";
import { SlotRendererProps } from "./SlotRenderer.d";

import { useLocation } from "react-router-dom";
import { findMatchingRoute, isRouteTable } from "@core/lib/routeUtils";
import { Fragment } from "react/jsx-runtime";

export const SlotRendererComponent = overridable(({ slots }: SlotRendererProps) => {
    const location = useLocation();

    return <>
        {slots.map((item, index) => {
            // Check if item is a RouteTable
            if (isRouteTable(item)) {
                const matchingComponents = findMatchingRoute(item, location.pathname);
                if (!matchingComponents) return null;

                return <SlotRendererComponent key={`route-match-${index}`} slots={matchingComponents} />
            }

            // Standard Component
            const { component, props, slots, css } = item;
            const Component: React.ComponentType<any> | undefined = !!component
                ? ComponentRegistry.get(component)?.component
                : undefined;

            return Component ? <Fragment key={index}>
                {css && <style>{css}</style>}
                <Component {...props} slots={slots} />
            </Fragment> : null;
        })}
    </>;
});
