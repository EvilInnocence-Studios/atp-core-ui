import {YouTubeProps} from "./YouTube.d";
import styles from './YouTube.module.scss';

export const YouTubeComponent = ({videoId}:YouTubeProps) =>
    <div className={styles.youtube}>
        <iframe className="youtube-player" type="text/html" src={`//www.youtube.com/embed/${videoId}?wmode=transparent`} allowfullscreen frameborder="0"></iframe>
    </div>;
