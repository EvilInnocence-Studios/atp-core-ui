import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { DateComponent } from "./Date.component";
import { DateProps, IDateInputProps, IDateProps } from "./Date.d";

const injectDateProps = createInjector(({}:IDateInputProps):IDateProps => {
    return {};
});

const connect = inject<IDateInputProps, DateProps>(mergeProps(
    injectDateProps,
));

export const Date = overridable<IDateInputProps>(connect(DateComponent));
