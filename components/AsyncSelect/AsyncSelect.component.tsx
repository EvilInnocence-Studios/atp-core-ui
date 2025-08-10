import { Select } from "antd";
import {AsyncSelectProps} from "./AsyncSelect.d";
import styles from './AsyncSelect.module.scss';

export const AsyncSelectComponent = ({isLoading, getOptions, ...props}:AsyncSelectProps) =>
    <Select {...props} />;
