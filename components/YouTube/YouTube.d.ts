export declare interface IYouTubeProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IYouTubeInputProps {
    className?: string;
    css?: string;
    classes?: any;
    slots?: Index<ILayoutComponent[]>;
    __layoutId?: string;
    videoId: string;
}

export type YouTubeProps = IYouTubeInputProps & IYouTubeProps;
