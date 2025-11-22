import { overridable } from "@core/lib/overridable";
import { YouTubeProps } from "./YouTube.d";
import styles from './YouTube.module.scss';

export const YouTubeComponent = overridable(({ videoId, classes = styles }: YouTubeProps) =>
    <div className={classes.youtube}>
        <iframe className="youtube-player" src={`//www.youtube.com/embed/${videoId}?wmode=transparent`} allowFullScreen frameBorder="0"></iframe>
    </div>
);
