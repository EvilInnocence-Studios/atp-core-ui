import { overridable } from "@core/lib/overridable";
import { useScrollable } from "@core/useScrollable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ScrollerComponent } from "./Scroller.component";
import { IScrollerInputProps, IScrollerProps, ScrollerProps } from "./Scroller.d";

const injectScrollerProps = createInjector(<T>({}:IScrollerInputProps<T>):IScrollerProps<T> => {
    const scroll = useScrollable(10);

    return {scroll};
});

const connect = inject<IScrollerInputProps<any>, ScrollerProps<any>>(mergeProps(
    injectScrollerProps,
));

export const Scroller = overridable<IScrollerInputProps<any>>(connect(ScrollerComponent));
