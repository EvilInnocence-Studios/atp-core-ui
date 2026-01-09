import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { ContentComponent } from "./Content.component";
import { ContentProps, IContentInputProps, IContentProps } from "./Content.d";
import { useLayoutManager } from "@theming/lib/layout/context";

const injectContentProps = createInjector(({}:IContentInputProps):IContentProps => {
    const {layout} = useLayoutManager();
    
    return {isEditing: !!layout};
});

const connect = inject<IContentInputProps, ContentProps>(mergeProps(
    injectContentProps,
));
export const connectContent = connect;

export const Content = overridable<IContentInputProps>(connect(ContentComponent));
