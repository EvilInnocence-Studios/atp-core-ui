import {LabelProps} from "./Label.d";
import styles from './Label.module.scss';

export const LabelComponent = ({label, children}:LabelProps) =>
    <div className={styles.label}>
        <label>{label}</label>
        <span>{children}</span>
    </div>;
