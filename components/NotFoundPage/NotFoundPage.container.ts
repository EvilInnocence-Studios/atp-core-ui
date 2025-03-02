import { createInjector, inject, mergeProps } from "unstateless";
import {NotFoundPageComponent} from "./NotFoundPage.component";
import {INotFoundPageInputProps, NotFoundPageProps, INotFoundPageProps} from "./NotFoundPage.d";

const injectNotFoundPageProps = createInjector(({}:INotFoundPageInputProps):INotFoundPageProps => {
    return {};
});

const connect = inject<INotFoundPageInputProps, NotFoundPageProps>(mergeProps(
    injectNotFoundPageProps,
));

export const NotFoundPage = connect(NotFoundPageComponent);
