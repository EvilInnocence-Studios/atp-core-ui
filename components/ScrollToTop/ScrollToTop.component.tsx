import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollToTopProps } from "./ScrollToTop.d";
import styles from './ScrollToTop.module.scss';
import { overridable } from "@core/lib/overridable";

export const ScrollToTopComponent = overridable(({toTop}:ScrollToTopProps) =>
    <FontAwesomeIcon icon={faCircleUp} className={styles.scrollToTop} onClick={toTop} />
);
