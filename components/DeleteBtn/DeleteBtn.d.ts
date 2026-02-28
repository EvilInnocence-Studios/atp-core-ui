export declare interface IDeleteBtnProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IDeleteBtnInputProps {
    onClick: () => void;
    entityType: string;
    classes?: any;
    message?: string;
}

export type DeleteBtnProps = IDeleteBtnInputProps & IDeleteBtnProps;