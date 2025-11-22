import clsx from "clsx";
import { ScrollerProps } from "./Scroller.d";
import styles from './Scroller.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export const ScrollerComponent = <T extends {}>({ title, items, scroll, getId, Component, componentProps, className, classes = styles }: ScrollerProps<T>) =>
    <div className={classes.scrollerContainer}>
        <h2 className={classes.scrollerTitle}>{title}</h2>
        <div
            className={clsx([classes.scroller, scroll.x.canScrollLeft && classes.canScrollLeft, scroll.x.canScrollRight && classes.canScrollRight])}
            ref={scroll.containerRef}
        >
            <FontAwesomeIcon
                icon={faCaretLeft}
                className={clsx([classes.arrow, classes.left])}
                onTouchStart={() => scroll.x.left()}
                onTouchEnd={scroll.stop}
                onMouseDown={() => scroll.x.left()}
                onMouseUp={scroll.stop}
                onMouseLeave={scroll.stop}
                style={{ visibility: scroll.x.canScrollLeft ? 'visible' : 'hidden' }}
            />
            <FontAwesomeIcon
                icon={faCaretRight}
                className={clsx([classes.arrow, classes.right])}
                onTouchStart={() => scroll.x.right()}
                onTouchEnd={scroll.stop}
                onMouseDown={() => scroll.x.right()}
                onMouseUp={scroll.stop}
                onMouseLeave={scroll.stop}
                style={{ visibility: scroll.x.canScrollRight ? 'visible' : 'hidden' }}
            />
            <div className={clsx([classes.scrollerList, className])} style={{ left: scroll.x.offset }} ref={scroll.ref}>
                {items.map((item) => <Component {...componentProps} item={item} key={getId(item)} />)}
            </div>
        </div>
    </div>;
