import { overridable } from "@core/lib/overridable";
import usePageTracking from "@core/lib/usePageTracking";
import { createInjector, inject, mergeProps } from "unstateless";
import { LayoutComponent } from "./Layout.component";
import { ILayoutInputProps, ILayoutProps, LayoutProps } from "./Layout.d";

const injectLayoutProps = createInjector(({ }: ILayoutInputProps): ILayoutProps => {
    usePageTracking();

    return { };
});

const connect = inject<ILayoutInputProps, LayoutProps>(mergeProps(
    injectLayoutProps,
));
export const connectLayout = connect;

export const Layout = overridable<ILayoutInputProps>(connect(LayoutComponent));
