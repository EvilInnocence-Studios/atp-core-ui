import { ILayoutComponent } from "./layout";
import { createContext, useContext } from "react";

export interface ILayoutManagerContext {
    layout: ILayoutComponent | null;
    selectedId: string | null;
    selectComponent: (id: string | null) => void;
    addComponent: (parentId: string, slotName: string, component: ILayoutComponent, index?: number) => void;
    removeComponent: (id: string) => void;
    updateComponent: (id: string, updates: Partial<ILayoutComponent>) => void;
}

export const LayoutManagerContext = createContext<ILayoutManagerContext>({
    layout: null,
    selectedId: null,
    selectComponent: () => {},
    addComponent: () => {},
    removeComponent: () => {},
    updateComponent: () => {},
});

export const useLayoutManager = () => useContext(LayoutManagerContext);
