import clsx from "clsx";
import { LabelProps } from "./Label.d";
import styles from './Label.module.scss';
import { overridable } from "@core/lib/overridable";

export const LabelComponent = overridable(({ label, children, className, classes = styles }: LabelProps) =>
    <div className={clsx([classes.label, "label", className])}>
        <label>{label}</label>
        <span>{children}</span>
    </div>
);
