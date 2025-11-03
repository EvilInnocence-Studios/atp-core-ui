import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { DeleteBtnProps, IDeleteBtnInputProps, IDeleteBtnProps } from "./DeleteBtn";
import { DeleteBtnComponent } from "./DeleteBtn.component";

const injectDeleteBtnProps = createInjector(({}:IDeleteBtnInputProps):IDeleteBtnProps => {
    return {};
});

const connect = inject<IDeleteBtnInputProps, DeleteBtnProps>(mergeProps(
    injectDeleteBtnProps,
));

export const DeleteBtn = overridable<IDeleteBtnInputProps>(connect(DeleteBtnComponent));
