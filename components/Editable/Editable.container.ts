import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { EditableProps, IEditableInputProps, IEditableProps } from "./Editable";
import { EditableComponent } from "./Editable.component";

const injectEditableProps = createInjector(({}:IEditableInputProps):IEditableProps => {
    return {};
});

const connect = inject<IEditableInputProps, EditableProps>(mergeProps(
    injectEditableProps,
));

export const Editable = overridable<IEditableInputProps>(connect(EditableComponent));
