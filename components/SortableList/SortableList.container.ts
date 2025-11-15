import { overridable } from "@core/lib/overridable";
import React from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { SortableListComponent } from "./SortableList.component";
import { ISortableListInputProps, ISortableListProps, SortableListProps } from "./SortableList.d";

const injectSortableListProps = <T, Extra = {}>() => createInjector(
    ({items, sort}:ISortableListInputProps<T, Extra>):ISortableListProps<T> => {
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

const connect = <T, Extra = unknown>() =>
    inject<ISortableListInputProps<T, Extra>, SortableListProps<T, Extra>>(
        mergeProps(
            injectSortableListProps<T, Extra>(),
        ),
    );
export const connectSortableList = connect;

export function SortableList<T, Extra = unknown>(props: ISortableListInputProps<T, Extra>) {
    const Connected = overridable<ISortableListInputProps<T, Extra>>(connect<T, Extra>()(SortableListComponent as React.ComponentType<SortableListProps<T, Extra>>));
    return React.createElement(Connected, props);
}
