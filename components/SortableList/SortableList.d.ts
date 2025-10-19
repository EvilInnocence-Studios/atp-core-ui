export declare interface ISortableItemProps<T> {
    item: T;
    index: number;
    moveToTop: (item: T) => void;
}

export declare interface ISortableListProps<T> {
    sortItems: (e:{active:{id:any}, over:{id:any} | null}) => void;
    moveToTop: (itemId: any) => () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface ISortableListInputProps<T, Extra = {}> {
    items: T[];
    getId: (item: T) => string;
    getListId: (item: T, index: number) => string;
    sort: (id:string, newIndex: number) => void;
    ItemComponent: React.ComponentType<{item: T} & Extra>;
    itemProps?: Extra;
}

export type SortableListProps<T, Extra = {}> = ISortableListInputProps<T, Extra> & ISortableListProps<T>;