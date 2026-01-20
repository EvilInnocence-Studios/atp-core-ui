export declare interface ILabelProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ILabelInputProps {
    label: string | React.ReactNode;
    children: React.ReactNode;
    className?: string;
    classes?: any;
}

export type LabelProps = ILabelInputProps & ILabelProps;