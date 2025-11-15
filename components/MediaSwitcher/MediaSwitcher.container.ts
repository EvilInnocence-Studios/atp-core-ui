import { overridable } from "@core/lib/overridable";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { MediaSwitcherComponent } from "./MediaSwitcher.component";
import { IMediaSwitcherInputProps, IMediaSwitcherProps, MediaSwitcherProps } from "./MediaSwitcher.d";

const injectMediaSwitcherProps = createInjector(<T>({media, defaultMediaId, getId}:IMediaSwitcherInputProps<T>):IMediaSwitcherProps => {
    const getDefaultMedia = () => defaultMediaId && media.length > 0 && media.find((mediaItem) => getId(mediaItem) === defaultMediaId)
        ? media.findIndex((mediaItem) => getId(mediaItem) === defaultMediaId)
        : 0
    
    const [curImage, setCurImage] = useState(getDefaultMedia());

    useEffect(() => {
        setCurImage(getDefaultMedia());
    }, [defaultMediaId]);

    const next = () => setCurImage((curImage + 1) % media.length);
    const prev = () => setCurImage((curImage + media.length - 1) % media.length);

    return {curImage, next, prev, setCurImage};
});

const connect = inject<IMediaSwitcherInputProps<any>, MediaSwitcherProps<any>>(mergeProps(
    injectMediaSwitcherProps,
));
export const connectMediaSwitcher = connect;

export const MediaSwitcher = overridable<IMediaSwitcherInputProps<any>>(connect(MediaSwitcherComponent));
