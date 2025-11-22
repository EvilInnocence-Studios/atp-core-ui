export declare interface IFaderProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IFaderInputProps {
    interval: number;
    children: React.ReactNode[];
    classes?: any;
}

export type FaderProps = IFaderInputProps & IFaderProps;