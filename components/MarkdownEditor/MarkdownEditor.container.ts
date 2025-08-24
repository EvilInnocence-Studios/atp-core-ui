import { createInjector, inject, mergeProps } from "unstateless";
import {MarkdownEditorComponent} from "./MarkdownEditor.component";
import {IMarkdownEditorInputProps, MarkdownEditorProps, IMarkdownEditorProps} from "./MarkdownEditor.d";

const injectMarkdownEditorProps = createInjector(({}:IMarkdownEditorInputProps):IMarkdownEditorProps => {
    return {};
});

const connect = inject<IMarkdownEditorInputProps, MarkdownEditorProps>(mergeProps(
    injectMarkdownEditorProps,
));

export const MarkdownEditor = connect(MarkdownEditorComponent);
