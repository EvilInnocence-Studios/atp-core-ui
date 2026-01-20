import { Breakpoint } from "antd";

export declare interface IResponsiveValueProps {

}

type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// What gets passed into the component from the parent as attributes
export declare interface IResponsiveValueInputProps<T extends string | number> {
    className?: string;
    classes?: any;
    label: string | React.ReactNode;
    value?: ResponsiveValue<T>;
    onChange: (value: ResponsiveValue<T>) => void;
    editor: (value: T, onChange: (value: T) => void) => React.ReactNode;
}

export type ResponsiveValueProps<T extends string | number> =
    IResponsiveValueInputProps<T> & IResponsiveValueProps;