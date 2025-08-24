export declare interface IMarkdownEditorProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IMarkdownEditorInputProps {
    value: string;
    onChange: (value: string) => void;
}

export type MarkdownEditorProps = IMarkdownEditorInputProps & IMarkdownEditorProps;