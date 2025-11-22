import { IProduct } from "@store-shared/product/types";

export declare interface IQueueProps<T> {
    item: T;
    refresh: () => void;
    done: () => void;
    next?: () => void;
    prev?: () => void;
    tag: ITag | null;
    itemCount: number;
    isLoading: boolean;
}

// What gets passed into the component from the parent as attributes
export declare interface IQueueInputProps<T> {
    groupId: string;
    tagId: string;
    itemType: string;
    loadItems: () => Promise<T[]>;
    getTags: (item: T) => string[];
    removeTag: (itemId: string, tagId: string) => Promise<void>;
    getId: (item: T) => string;
    getName: (item: T) => string;
    getEditor: (item: T) => React.ReactNode;
    classes?: any;
}

export type QueueProps<T> = IQueueInputProps<T> & IQueueProps<T>;