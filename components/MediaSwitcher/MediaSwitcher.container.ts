import { createInjector, inject, mergeProps } from "unstateless";
import {MediaSwitcherComponent} from "./MediaSwitcher.component";
import {IMediaSwitcherInputProps, MediaSwitcherProps, IMediaSwitcherProps} from "./MediaSwitcher.d";
import { useState } from "react";

const injectMediaSwitcherProps = createInjector(<T>({media, defaultMediaId, getId}:IMediaSwitcherInputProps<T>):IMediaSwitcherProps => {
    const [curImage, setCurImage] = useState(
        defaultMediaId && media.length > 0 && media.find((mediaItem) => getId(mediaItem) === defaultMediaId)
            ? media.findIndex((mediaItem) => getId(mediaItem) === defaultMediaId)
            : 0
    );
    const next = () => setCurImage((curImage + 1) % media.length);
    const prev = () => setCurImage((curImage + media.length - 1) % media.length);

    return {curImage, next, prev, setCurImage};
});

const connect = inject<IMediaSwitcherInputProps<any>, MediaSwitcherProps<any>>(mergeProps(
    injectMediaSwitcherProps,
));

export const MediaSwitcher = connect(MediaSwitcherComponent);
