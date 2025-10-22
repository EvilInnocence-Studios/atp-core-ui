import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { MediaSwitcherProps } from "./MediaSwitcher.d";
import styles from './MediaSwitcher.module.scss';

export const MediaSwitcherComponent = <T extends any>({media, curImage, next, prev, setCurImage, render, getId}:MediaSwitcherProps<T>) => <>
    <div className={styles.mediaSwitcher}>
        {media.length > 1 &&<>
            <FontAwesomeIcon className={clsx([styles.navBtn, styles.prev])} icon={faCaretLeft } onClick={prev} />
            <FontAwesomeIcon className={clsx([styles.navBtn, styles.next])} icon={faCaretRight} onClick={next} />
        </>}
        {media.map(image => <div
            key={getId(image)}
            className={clsx([styles.mediaImage, curImage === media.indexOf(image) && styles.active])}
        >
            {render(image)}
        </div>)}
    </div>
    {media.length > 1 && <div className={styles.thumbs}>
        {media.map(image => <div
            key={getId(image)}
            className={clsx([styles.thumb, curImage === media.indexOf(image) && styles.active])}
            onClick={() => setCurImage(media.indexOf(image))}
        >
            {render(image)}
        </div>)}
    </div>}
</>;
