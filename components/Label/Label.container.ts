import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { LabelComponent } from "./Label.component";
import { ILabelInputProps, ILabelProps, LabelProps } from "./Label.d";

const injectLabelProps = createInjector(({}:ILabelInputProps):ILabelProps => {
    return {};
});

const connect = inject<ILabelInputProps, LabelProps>(mergeProps(
    injectLabelProps,
));

export const Label = overridable<ILabelInputProps>(connect(LabelComponent));
