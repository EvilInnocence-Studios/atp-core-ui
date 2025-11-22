export declare interface IMediaPopupProps {
    isOpen: boolean;
    selectedImage: string | null;
    close: () => void;
    open: (id: string) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IMediaPopupInputProps<T> {
    media: T[];
    getId: (item: T) => string;
    render: (item: T) => JSX.Element;
    vertical?: boolean;
    classes?: any;
}

export type MediaPopupProps = IMediaPopupInputProps<T> & IMediaPopupProps;