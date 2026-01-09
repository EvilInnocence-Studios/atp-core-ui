export declare interface IContentProps {
    isEditing: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IContentInputProps {
    classes?: any;
}

export type ContentProps = IContentInputProps & IContentProps;