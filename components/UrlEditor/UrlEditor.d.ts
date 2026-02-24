export declare interface IUrlEditorProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IUrlEditorInputProps {
    classes?: any;
    value: string;
    srcValue?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export type UrlEditorProps = IUrlEditorInputProps & IUrlEditorProps;