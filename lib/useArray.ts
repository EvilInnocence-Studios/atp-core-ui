import { useState } from "react";

export declare interface IArrayState<T> {
    items: T[];
    add: (item: T) => void;
    remove: (item: T) => void;
    clear: () => void;
}

export const useArray = <T>(initialValue: T[]) => {
    const [items, setItems] = useState<T[]>(initialValue);

    const add = (item: T) => {
        setItems((prev) => [...prev, item]);
    };

    const remove = (item: T) => {
        setItems((prev) => prev.filter((i) => i !== item));
    };

    const clear = () => {
        setItems([]);
    };

    return { items, add, remove, clear };
}