import { Select } from "antd";
import {AsyncSelectProps} from "./AsyncSelect.d";

export const AsyncSelectComponent = ({isLoading, getOptions, ...props}:AsyncSelectProps) =>
    <Select {...props} />;
