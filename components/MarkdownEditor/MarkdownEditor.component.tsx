import {
    MDXEditor, MDXEditorMethods,
    headingsPlugin, toolbarPlugin, markdownShortcutPlugin, listsPlugin, linkPlugin, linkDialogPlugin, imagePlugin, tablePlugin, thematicBreakPlugin,
    BoldItalicUnderlineToggles, BlockTypeSelect, CreateLink, InsertImage, InsertTable, ListsToggle, InsertThematicBreak,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef } from "react";
import { MarkdownEditorProps } from "./MarkdownEditor.d";
import styles from "./MarkdownEditor.module.scss";

export const MarkdownEditorComponent = ({value, onChange}:MarkdownEditorProps) => {
    const ref = useRef<MDXEditorMethods>(null);
    
    useEffect(() => {
        if (ref.current) {
            ref.current.setMarkdown(value || "");
        }
    }, [value, ref]);

    return <div className={styles.editor}>
        <MDXEditor
            ref={ref}
            markdown={value || ""}
            onChange={onChange}
            plugins={[
                headingsPlugin(),
                markdownShortcutPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                imagePlugin(),
                tablePlugin(),
                thematicBreakPlugin(),
                toolbarPlugin({
                    toolbarContents: () => <>
                        <BoldItalicUnderlineToggles />
                        <BlockTypeSelect />
                        <CreateLink />
                        <InsertImage />
                        <InsertTable />
                        <ListsToggle />
                        <InsertThematicBreak />
                    </>
                }),
            ]}
        />
    </div>;
}
