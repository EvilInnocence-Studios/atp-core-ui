import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import { useState } from "react";
import { onInputChange } from "./onInputChange";

export const useTableFilters = <T extends {}>(unfilteredItems:T[]) => {
    const [filters, setFilters] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

    const setFilter = (key:keyof T) => (value:string) => {
        setFilters({...filters, [key]: value});
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

    const filter = (title:string, key:keyof T) => <>
        <Input.Search addonBefore={title} value={filters[key]} onChange={onInputChange(setFilter(key))} />
    </>;

    const Clear = <Button type="link" onClick={clearFilters}><FontAwesomeIcon icon={faRotate} /></Button>;

    return {clearFilters, items, filter, Clear};
}