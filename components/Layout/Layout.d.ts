import { ILayoutComponent, ITheme } from "@core/lib/layout/layout";

export declare interface ILayoutProps {
    layout: ILayoutComponent;
}

// What gets passed into the component from the parent as attributes
export declare interface ILayoutInputProps {
    classes?: any;
    theme: ITheme;
}

export type LayoutProps = ILayoutInputProps & ILayoutProps;