import { DndContext } from "@dnd-kit/core";
import {SortableListProps} from "./SortableList.d";
import styles from './SortableList.module.scss';
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForwardStep, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const ListItem = ({item, index, moveToTop, getId, getListId, children, className}:any) => {
    const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({
        id: getListId(item, index),
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      } : undefined;

    return <div className={clsx([styles.link, className])} key={getId(item)} style={style} ref={setNodeRef} {...attributes}>
        <span className={styles.icon} ref={setActivatorNodeRef} {...listeners}>
            <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <span className={styles.icon}>
            <FontAwesomeIcon title="Move to top" icon={faForwardStep} rotation={270} onClick={moveToTop(getId(item))} />
        </span>
        {children}
    </div>;
}

export const SortableListComponent = <T extends any, Extra = {}>({
    items, getId, getListId,
    sortItems, moveToTop,
    ItemComponent, itemProps,
    className, itemClassName,
    isActive, activeClassName,
}:SortableListProps<T, Extra>) =>
    <DndContext onDragEnd={sortItems}>
        <SortableContext items={items.map(getListId)} strategy={verticalListSortingStrategy}>
            <div className={className}>
                {items.map((item, i) => <ListItem
                    className={clsx([itemClassName, isActive && isActive(item) && activeClassName])}
                    key={getId(item)}
                    item={item}
                    getId={getId}
                    getListId={getListId}
                    index={i}
                    moveToTop={moveToTop}
                >
                    <ItemComponent item={item} {...itemProps as Extra} />
                </ListItem>)}
            </div>
        </SortableContext>
    </DndContext>;
