import {
    MDXEditor, MDXEditorMethods,
    headingsPlugin, toolbarPlugin, markdownShortcutPlugin, listsPlugin, linkPlugin, linkDialogPlugin, imagePlugin, tablePlugin, thematicBreakPlugin,
    BoldItalicUnderlineToggles, BlockTypeSelect, CreateLink, InsertImage, InsertTable, ListsToggle, InsertThematicBreak,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef } from "react";
import { MarkdownEditorProps } from "./MarkdownEditor.d";
import styles from "./MarkdownEditor.module.scss";
import { debounce } from "lodash";
import { overridable } from "@core/lib/overridable";

export const MarkdownEditorComponent = overridable(({value, onChange}:MarkdownEditorProps) => {
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
            onChange={debounce(onChange, 2000)}
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
});
