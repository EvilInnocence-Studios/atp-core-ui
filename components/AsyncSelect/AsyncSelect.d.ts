import { SelectProps } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";

export declare interface IAsyncSelectProps<OptionType extends BaseOptionType | DefaultOptionType> {
    options: OptionType[];
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IAsyncSelectInputProps<ValueType, OptionType extends BaseOptionType | DefaultOptionType> extends SelectProps<ValueType, OptionType> {
    getOptions: () => Promise<OptionType[]>;
}

export type AsyncSelectProps<
    ValueType = any,
    OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType
> = IAsyncSelectInputProps<ValueType, OptionType> & IAsyncSelectProps<OptionType>;
