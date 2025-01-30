import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ScrollToTopProps} from "./ScrollToTop.d";
import styles from './ScrollToTop.module.scss';
import { faCircleUp, faScroll } from "@fortawesome/free-solid-svg-icons";

export const ScrollToTopComponent = ({toTop}:ScrollToTopProps) =>
    <FontAwesomeIcon icon={faCircleUp} className={styles.scrollToTop} onClick={toTop} />;
