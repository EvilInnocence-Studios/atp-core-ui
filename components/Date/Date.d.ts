export declare interface IDateProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IDateInputProps {
    date: string | null;
}

export type DateProps = IDateInputProps & IDateProps;