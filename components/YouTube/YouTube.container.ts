import { createInjector, inject, mergeProps } from "unstateless";
import {YouTubeComponent} from "./YouTube.component";
import {IYouTubeInputProps, YouTubeProps, IYouTubeProps} from "./YouTube.d";

const injectYouTubeProps = createInjector(({}:IYouTubeInputProps):IYouTubeProps => {
    return {};
});

const connect = inject<IYouTubeInputProps, YouTubeProps>(mergeProps(
    injectYouTubeProps,
));

export const YouTube = connect(YouTubeComponent);
