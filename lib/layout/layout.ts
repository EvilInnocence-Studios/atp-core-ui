import { Index } from "ts-functional/dist/types";
import { IOperation } from "./derivers";

export declare interface ITheme {
    name: string;
    displayName?: string;
    description?: string;
    routes: Index<string>;
    theme?: Index<Index<string>>;
    css?: string;
    derivers?: Index<IOperation>;
    layouts: Index<ILayoutComponent>;
}

export declare type Layout = Index<ILayoutComponent>;

export declare type RouteTable = Index<ILayoutComponent[]>;
export declare type SlotItem = RouteTable | ILayoutComponent;

export declare interface ILayoutComponent {
    id?: string;
    component: string;
    slots?: Index<SlotItem[]>;
    context?: Index<any>;
    props?: Index<any>;
    css?: string;
    map?: Index<string | { from: string }>;
}