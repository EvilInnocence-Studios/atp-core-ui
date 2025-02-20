export declare interface IYouTubeProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IYouTubeInputProps {
    videoId: string;
}

export type YouTubeProps = IYouTubeInputProps & IYouTubeProps;