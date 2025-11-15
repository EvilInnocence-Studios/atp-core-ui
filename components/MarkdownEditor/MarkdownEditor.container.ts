import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { MarkdownEditorComponent } from "./MarkdownEditor.component";
import { IMarkdownEditorInputProps, IMarkdownEditorProps, MarkdownEditorProps } from "./MarkdownEditor.d";

const injectMarkdownEditorProps = createInjector(({}:IMarkdownEditorInputProps):IMarkdownEditorProps => {
    return {};
});

const connect = inject<IMarkdownEditorInputProps, MarkdownEditorProps>(mergeProps(
    injectMarkdownEditorProps,
));
export const connectMarkdownEditor = connect;

export const MarkdownEditor = overridable<IMarkdownEditorInputProps>(connect(MarkdownEditorComponent));
