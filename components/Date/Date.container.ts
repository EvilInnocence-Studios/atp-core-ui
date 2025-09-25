import { createInjector, inject, mergeProps } from "unstateless";
import {DateComponent} from "./Date.component";
import {IDateInputProps, DateProps, IDateProps} from "./Date.d";

const injectDateProps = createInjector(({}:IDateInputProps):IDateProps => {
    return {};
});

const connect = inject<IDateInputProps, DateProps>(mergeProps(
    injectDateProps,
));

export const Date = connect(DateComponent);
