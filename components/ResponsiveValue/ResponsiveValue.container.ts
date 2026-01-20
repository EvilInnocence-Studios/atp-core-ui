import { createInjector, inject, mergeProps } from "unstateless";
import {ResponsiveValueComponent} from "./ResponsiveValue.component";
import {IResponsiveValueInputProps, ResponsiveValueProps, IResponsiveValueProps} from "./ResponsiveValue.d";
import { overridable } from "@core/lib/overridable";

const injectResponsiveValueProps = createInjector(({}:IResponsiveValueInputProps<any>):IResponsiveValueProps => {
    return {};
});

const connect = inject<IResponsiveValueInputProps<any>, ResponsiveValueProps<any>>(mergeProps(
    injectResponsiveValueProps,
));
export const connectResponsiveValue = connect;

export const ResponsiveValue = overridable<IResponsiveValueInputProps<any>>(connect(ResponsiveValueComponent));
