import { ITag } from "@common-shared/tag/types";
import { services } from "@core/lib/api";
import { useLoaderAsync } from "@core/lib/useLoader";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { QueueComponent } from "./Queue.component";
import { IQueueInputProps, IQueueProps } from "./Queue.d";

const injectQueueProps = createInjector(<T>({
    groupId, tagId,
    loadItems, getTags, getId, removeTag
}:IQueueInputProps<T>):IQueueProps<T> => {
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState<T[]>([]);
    const [tag, setTag] = useState<ITag | null>(null);
    const loader = useLoaderAsync();

    const refresh = (keepOffset?: boolean) => {
        if(!keepOffset) {
            setOffset(0);
        }
        loader(() => Promise.all([
            services().tagGroup.tag.get(groupId, tagId),
            loadItems()
        ]).then(([tag, loadedItems]) => {
            setTag(tag);
            setItems(loadedItems
                .filter(i => getTags(i).includes(tag.name))
                .sort((a, b) => getId(b).padStart(5, "0").localeCompare(getId(a).padStart(5, "0")))
            );
        }));
    }

    useEffect(refresh, [tagId, groupId]);

    const done = () => {
        const id = getId(items[offset]);
        loader(() => 
            removeTag(id, tagId)
                .then(() => {
                    setItems(items.filter(i => getId(i) !== id));
                })
        );
    }

    const next = offset < items.length - 1 ? () => {
        setOffset(offset + 1);
    } : undefined;

    const prev = offset > 0 ? () => {
        setOffset(offset - 1);
    } : undefined;
    
    return {item: items[offset], next, prev, refresh, tag, itemCount: items.length, done, isLoading: loader.isLoading};
});

const connect = inject<any, any>(mergeProps(
    injectQueueProps,
));

export const Queue = connect(QueueComponent);
