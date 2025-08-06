export declare interface IScrollerProps<T> {
    scroll: IScrollable;
}

// What gets passed into the component from the parent as attributes
export declare interface IScrollerInputProps<T> {
    items: T[];
    title: string;
    getId: (item: T) => string;
    Component: React.ComponentType<{item: T}>;
    componentProps?: React.ComponentProps<any>;
}

export type ScrollerProps<T> = IScrollerInputProps<T> & IScrollerProps<T>;