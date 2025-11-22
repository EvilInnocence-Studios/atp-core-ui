export declare interface IDateProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IDateInputProps {
    date: string | null;
    classes?: any;
}

export type DateProps = IDateInputProps & IDateProps;