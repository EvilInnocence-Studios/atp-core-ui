import { createInjector, inject, mergeProps } from "unstateless";
import {ContentComponent} from "./Content.component";
import {IContentInputProps, ContentProps, IContentProps} from "./Content.d";

const injectContentProps = createInjector(({}:IContentInputProps):IContentProps => {
    return {};
});

const connect = inject<IContentInputProps, ContentProps>(mergeProps(
    injectContentProps,
));

export const Content = connect(ContentComponent);
