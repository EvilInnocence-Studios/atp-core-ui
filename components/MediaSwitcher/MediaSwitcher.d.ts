import { IProductMedia } from "@store-shared/product/types";
import { Setter } from "unstateless";

export declare interface IMediaSwitcherProps {
    next: () => void;
    prev: () => void;
    curImage: number;
    setCurImage: Setter<number>;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaSwitcherInputProps<T> {
    media: T[];
    defaultMediaId:string | null;
    getId: (item:T) => string;
    render: (item:T) => JSX.Element;
}

export type MediaSwitcherProps<T> = IMediaSwitcherInputProps<T> & IMediaSwitcherProps;