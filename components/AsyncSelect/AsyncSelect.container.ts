import { createInjector, inject, mergeProps } from "unstateless";
import {AsyncSelectComponent} from "./AsyncSelect.component";
import {IAsyncSelectInputProps, AsyncSelectProps, IAsyncSelectProps} from "./AsyncSelect.d";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { useLoaderAsync } from "@core/lib/useLoader";

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

export const AsyncSelect = connect(AsyncSelectComponent);
