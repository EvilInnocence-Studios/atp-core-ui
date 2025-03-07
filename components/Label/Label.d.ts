export declare interface ILabelProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ILabelInputProps {
    label: string;
    children: React.ReactNode;
}

export type LabelProps = ILabelInputProps & ILabelProps;