import { overridable } from "@core/lib/overridable";
import { createInjector, inject, mergeProps } from "unstateless";
import { YouTubeComponent } from "./YouTube.component";
import { IYouTubeInputProps, IYouTubeProps, YouTubeProps } from "./YouTube.d";

const injectYouTubeProps = createInjector(({}:IYouTubeInputProps):IYouTubeProps => {
    return {};
});

const connect = inject<IYouTubeInputProps, YouTubeProps>(mergeProps(
    injectYouTubeProps,
));

export const YouTube = overridable<IYouTubeInputProps>(connect(YouTubeComponent));
