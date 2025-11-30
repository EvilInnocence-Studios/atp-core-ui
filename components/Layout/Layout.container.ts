import { overridable } from "@core/lib/overridable";
import usePageTracking from "@core/lib/usePageTracking";
import { useLocation } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { LayoutComponent } from "./Layout.component";
import { ILayoutInputProps, ILayoutProps, LayoutProps } from "./Layout.d";

const injectLayoutProps = createInjector(({ theme }: ILayoutInputProps): ILayoutProps => {
    const location = useLocation();

    usePageTracking();

    const layoutName: string = Object.values(theme.routes).find(
        (route) => location.pathname.match(route)
    ) || "default";
    const layout = theme.layouts[layoutName];

    return { layout };
});

const connect = inject<ILayoutInputProps, LayoutProps>(mergeProps(
    injectLayoutProps,
));
export const connectLayout = connect;

export const Layout = overridable<ILayoutInputProps>(connect(LayoutComponent));
