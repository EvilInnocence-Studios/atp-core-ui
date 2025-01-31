import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollToTopProps } from "./ScrollToTop.d";
import styles from './ScrollToTop.module.scss';

export const ScrollToTopComponent = ({toTop}:ScrollToTopProps) =>
    <FontAwesomeIcon icon={faCircleUp} className={styles.scrollToTop} onClick={toTop} />;
