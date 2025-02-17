import { Label } from "@core/components/Label";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Select } from "antd";
import { useState } from "react";
import { onInputChange } from "../onInputChange";
import styles from "./useTableFilters.module.scss";
import { stopProp } from "../util";

export declare interface ITableFilters<T> {
    clearFilters: () => void;
    items:T[];
    filter:(title:string, key:keyof T, width?:number) => JSX.Element;
    select:(title:string, key:keyof T, options:string[]) => JSX.Element;
    custom:(key:keyof T, render:(value:any, update:(newValue:any) => void) => JSX.Element) => JSX.Element;
    Clear:JSX.Element;
    values:Record<keyof T, string>;
}

export const useTableFilters = <T extends {}>(unfilteredItems:T[]):ITableFilters<T> => {
    const [filters, setFilters] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

    const setFilter = (key:keyof T) => (value:string) => {
        if(value) {
            setFilters({...filters, [key]: value});
        } else {
            const newFilters = {...filters};
            delete(newFilters[key]);
            setFilters(newFilters);
        }
    }

    const clearFilters = () => {
        setFilters({} as Record<keyof T, string>);
    }

    const items = unfilteredItems.filter(item => {
        for (const key in filters) {
            if (!`${item[key]}`.toLocaleLowerCase().includes(filters[key].toLocaleLowerCase())) {
                return false;
            }
        }
        return true;
    });

    // Standard input filter
    const filter = (title:string, key:keyof T, width?:number) =>
        <Input.Search {...stopProp} addonBefore={title} value={filters[key]} onChange={onInputChange(setFilter(key))} style={{width}}/>;

    // Basic select filter
    const select = (title:string, key:keyof T, options:string[]) => <div className={styles.select}><Label label={title}>
        <Select value={filters[key]} onChange={setFilter(key)} allowClear {...stopProp}>
            {options.map(option => <Select.Option key={option} value={option}>{option}</Select.Option>)}
        </Select>
    </Label></div>;

    // Allow custom filters
    const custom = (key:keyof T, render:(value:any, update:(newValue:any) => void) => JSX.Element) => <div {...stopProp}>
        {render(filters[key], setFilter(key))}
    </div>;

    const Clear = <Button type="link" onClick={clearFilters}><FontAwesomeIcon icon={faRotate} /></Button>;

    return {clearFilters, items, filter, select, custom, Clear, values: filters};
}
