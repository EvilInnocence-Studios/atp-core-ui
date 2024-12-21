import { createInjector, inject, mergeProps } from "unstateless";
import {LabelComponent} from "./Label.component";
import {ILabelInputProps, LabelProps, ILabelProps} from "./Label.d";

const injectLabelProps = createInjector(({}:ILabelInputProps):ILabelProps => {
    return {};
});

const connect = inject<ILabelInputProps, LabelProps>(mergeProps(
    injectLabelProps,
));

export const Label = connect(LabelComponent);
