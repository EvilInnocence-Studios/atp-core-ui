import { onInputChange } from "@core/lib/onInputChange";
import { Input } from "antd";
import clsx from "clsx";
import { debounce } from 'lodash';
import { useEffect, useState } from "react";
import { EditableProps } from "./Editable";
import styles from './Editable.module.scss';
import { stopProp } from "@core/lib/util";
import { overridable } from "@core/lib/overridable";

export const EditableComponent = overridable(({value, onChange, placeholder, textArea}:EditableProps) => { 
    const [curValue, setCurValue] = useState(value);

    const debouncedOnChange = debounce(onChange, 1000);

    useEffect(() => {
        if(value !== curValue) {
            setCurValue(value);
        }
    }, [value]);

    useEffect(() => {
        if(curValue !== value) {
            debouncedOnChange(curValue);
        }
        return debouncedOnChange.cancel;
    }, [curValue]);

    const [hasChanges, setHasChanges] = useState(curValue !== value);
    useEffect(() => {
        setHasChanges(curValue !== value);
    }, [curValue, value]);
    
    const Component = textArea ? Input.TextArea : Input;
    return <Component
        value={curValue}
        className={clsx([styles.editable, hasChanges && styles.hasChanges])}
        onChange={onInputChange(setCurValue)}
        {...stopProp}
        placeholder={placeholder}
        autoSize={{minRows: 1, maxRows: 100}}
    />;
});
