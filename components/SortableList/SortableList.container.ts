import { overridable } from "@core/lib/overridable";
import React from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { SortableListComponent } from "./SortableList.component";
import { ISortableListInputProps, ISortableListProps, SortableListProps } from "./SortableList.d";

const injectSortableListProps = createInjector(
    ({items, sort}:ISortableListInputProps<any, any>):ISortableListProps<any> => {
        const sortItems = (e:{active:{id:any}, over:{id:any} | null}) => {
            const {active, over} = e;
            const [linkId, _oldIndex] = active.id.split(':');
            const newIndex = over ? over.id.split(':')[1] : items.length - 1;
            sort(linkId, newIndex);
        };

        const moveToTop = (itemId:any) => () => {
            sort(itemId, 0);
        };

        const moveToBottom = (itemId:any) => () => {
            sort(itemId, items.length - 1);
        }
        
        return {sortItems, moveToTop, moveToBottom};
    }
);

const connect = inject<ISortableListInputProps<any, any>, SortableListProps<any, any>>(
    mergeProps(
        injectSortableListProps,
    ),
);
export const connectSortableList = connect;

const Connected = overridable<ISortableListInputProps<any, any>>(connect(SortableListComponent as React.ComponentType<SortableListProps<any, any>>));

export function SortableList<T, Extra = unknown>(props: ISortableListInputProps<T, Extra>) {
    return React.createElement(Connected, props as any);
}
