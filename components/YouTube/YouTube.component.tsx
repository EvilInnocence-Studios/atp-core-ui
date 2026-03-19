import { overridable } from "@core/lib/overridable";
import {YouTubeProps} from "./YouTube.d";
import styles from './YouTube.module.scss';
import clsx from "clsx";

export const YouTubeComponent = overridable(({classes = styles, className, css, videoId}:YouTubeProps) => <>
    {css && <style>{css}</style>}
    <div className={clsx(classes.youtube, className)}>
        <iframe className="youtube-player" src={`//www.youtube.com/embed/${videoId}?wmode=transparent`} allowFullScreen frameBorder="0"></iframe>
    </div>
</>);

