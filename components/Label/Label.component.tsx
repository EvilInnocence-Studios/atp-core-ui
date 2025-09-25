import clsx from "clsx";
import {LabelProps} from "./Label.d";
import styles from './Label.module.scss';

export const LabelComponent = ({label, children, className}:LabelProps) =>
    <div className={clsx([styles.label, "label", className])}>
        <label>{label}</label>
        <span>{children}</span>
    </div>;
