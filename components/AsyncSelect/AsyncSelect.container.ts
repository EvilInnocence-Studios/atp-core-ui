import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { AsyncSelectComponent } from "./AsyncSelect.component";
import { AsyncSelectProps, IAsyncSelectInputProps, IAsyncSelectProps } from "./AsyncSelect.d";

const injectAsyncSelectProps = createInjector(<ValueType, OptionType extends BaseOptionType | DefaultOptionType>({getOptions}:IAsyncSelectInputProps<ValueType, OptionType>):IAsyncSelectProps<OptionType> => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const loader = useLoaderAsync();

    useEffect(() => {
        loader(() => getOptions().then(setOptions));
    }, []);
    
    return {options, isLoading: loader.isLoading};
});

const connect = inject<IAsyncSelectInputProps<any, any>, AsyncSelectProps<any>>(mergeProps(
    injectAsyncSelectProps,
));
export const connectAsyncSelect = connect;

export const AsyncSelect = overridable<IAsyncSelectInputProps<any, any>>(connect(AsyncSelectComponent));
