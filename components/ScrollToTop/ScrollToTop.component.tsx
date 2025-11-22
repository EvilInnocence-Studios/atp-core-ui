import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollToTopProps } from "./ScrollToTop.d";
import styles from './ScrollToTop.module.scss';
import { overridable } from "@core/lib/overridable";

export const ScrollToTopComponent = overridable(({ toTop, classes = styles }: ScrollToTopProps) =>
    <FontAwesomeIcon icon={faCircleUp} className={classes.scrollToTop} onClick={toTop} />
);
