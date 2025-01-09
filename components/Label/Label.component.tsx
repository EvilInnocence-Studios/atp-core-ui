import clsx from "clsx";
import {LabelProps} from "./Label.d";
import styles from './Label.module.scss';

export const LabelComponent = ({label, children}:LabelProps) =>
    <div className={clsx([styles.label, "label"])}>
        <label>{label}</label>
        <span>{children}</span>
    </div>;
