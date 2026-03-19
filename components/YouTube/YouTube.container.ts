import { createInjector, inject, mergeProps } from "unstateless";
import {YouTubeComponent} from "./YouTube.component";
import {IYouTubeInputProps, YouTubeProps, IYouTubeProps} from "./YouTube.d";
import { overridable } from "@core/lib/overridable";
import { withLayoutMetadata } from "@theming/lib/layout/componentRegistry";
import icon from './icon.svg';
import { YouTubePropEditor } from "./YouTube.props";

const injectYouTubeProps = createInjector(({}:IYouTubeInputProps):IYouTubeProps => {
    return {};
});

const connect = inject<IYouTubeInputProps, YouTubeProps>(mergeProps(
    injectYouTubeProps,
));
export const connectYouTube = connect;

export const YouTube = withLayoutMetadata(
    overridable<IYouTubeInputProps>(connect(YouTubeComponent)),
    {
        name: "YouTube",
        displayName: "YouTube",
        category: "Media",
        description: "",
        icon,
        getSlotDisplayName: (slotName, props) => props[slotName] || slotName,
        propEditor: YouTubePropEditor,
    }
);
