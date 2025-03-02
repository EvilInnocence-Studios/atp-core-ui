import {NotFoundPageProps} from "./NotFoundPage.d";
import styles from './NotFoundPage.module.scss';
import slug from "./404slug.jpg";
import { Link } from "react-router";

export const NotFoundPageComponent = ({}:NotFoundPageProps) =>
    <div className={styles.notFoundPage}>
        <h1>404 - Page Not Found</h1>
        <img src={slug} alt="404" className={styles.img}/>
        <p>
            The page you requested has been eaten by a giant slug monster.<br/>
            Return <Link to="/">home</Link> before it eats you too!</p>
    </div>;
