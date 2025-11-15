import clsx from "clsx";
import {LabelProps} from "./Label.d";
import styles from './Label.module.scss';
import { overridable } from "@core/lib/overridable";

export const LabelComponent = overridable(({label, children, className}:LabelProps) =>
    <div className={clsx([styles.label, "label", className])}>
        <label>{label}</label>
        <span>{children}</span>
    </div>
);
