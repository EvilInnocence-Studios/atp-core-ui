import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { MediaSwitcherProps } from "./MediaSwitcher.d";
import styles from './MediaSwitcher.module.scss';

export const MediaSwitcherComponent = <T extends any>({ media, curImage, next, prev, setCurImage, render, getId, classes = styles }: MediaSwitcherProps<T>) => <>
    <div className={classes.mediaSwitcher}>
        {media.length > 1 && <>
            <FontAwesomeIcon className={clsx([classes.navBtn, classes.prev])} icon={faCaretLeft} onClick={prev} />
            <FontAwesomeIcon className={clsx([classes.navBtn, classes.next])} icon={faCaretRight} onClick={next} />
        </>}
        {media.map(image => <div
            key={getId(image)}
            className={clsx([classes.mediaImage, curImage === media.indexOf(image) && classes.active])}
        >
            {render(image)}
        </div>)}
    </div>
    {media.length > 1 && <div className={classes.thumbs}>
        {media.map(image => <div
            key={getId(image)}
            className={clsx([classes.thumb, curImage === media.indexOf(image) && classes.active])}
            onClick={() => setCurImage(media.indexOf(image))}
        >
            {render(image)}
        </div>)}
    </div>}
</>;
