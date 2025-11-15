import { Select } from "antd";
import {AsyncSelectProps} from "./AsyncSelect.d";
import { overridable } from "@core/lib/overridable";

export const AsyncSelectComponent = overridable(({isLoading, getOptions, ...props}:AsyncSelectProps) =>
    <Select {...props} />
);
