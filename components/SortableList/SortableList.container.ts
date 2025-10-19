import { createInjector, inject, mergeProps } from "unstateless";
import React from "react";
import {SortableListComponent} from "./SortableList.component";
import {ISortableListInputProps, SortableListProps, ISortableListProps} from "./SortableList.d";

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
        
        return {sortItems, moveToTop};
    }
);

const connect = <T, Extra = unknown>() =>
    inject<ISortableListInputProps<T, Extra>, SortableListProps<T, Extra>>(
        mergeProps(
            injectSortableListProps<T, Extra>(),
        ),
    );

export function SortableList<T, Extra = unknown>(props: ISortableListInputProps<T, Extra>) {
    const Connected = connect<T, Extra>()(SortableListComponent as React.ComponentType<SortableListProps<T, Extra>>);
    return React.createElement(Connected, props);
}
