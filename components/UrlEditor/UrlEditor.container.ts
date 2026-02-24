import { createInjector, inject, mergeProps } from "unstateless";
import {UrlEditorComponent} from "./UrlEditor.component";
import {IUrlEditorInputProps, UrlEditorProps, IUrlEditorProps} from "./UrlEditor.d";
import { overridable } from "@core/lib/overridable";

const injectUrlEditorProps = createInjector(({}:IUrlEditorInputProps):IUrlEditorProps => {
    return {};
});

const connect = inject<IUrlEditorInputProps, UrlEditorProps>(mergeProps(
    injectUrlEditorProps,
));
export const connectUrlEditor = connect;

export const UrlEditor = overridable<IUrlEditorInputProps>(connect(UrlEditorComponent));
