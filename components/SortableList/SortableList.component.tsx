import { DndContext } from "@dnd-kit/core";
import {SortableListProps} from "./SortableList.d";
import styles from './SortableList.module.scss';
import { horizontalListSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForwardStep, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const ListItem = ({item, index, moveToTop, moveToBottom, getId, getListId, children, className, direction}:any) => {
    const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({
        id: getListId(item, index),
      });
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition
      } : undefined;

    return <div className={clsx([styles.link, className, styles[direction]])} key={getId(item)} style={style} ref={setNodeRef} {...attributes}>
        <span className={styles.icon} ref={setActivatorNodeRef} {...listeners}>
            <FontAwesomeIcon icon={faGripVertical} />
        </span>
        <span className={styles.icon}>
            <FontAwesomeIcon
                title={direction === "vertical" ? "Move to top" : "Move to front"}
                icon={faForwardStep}
                rotation={direction === "vertical" ? 270 : 180}
                onClick={moveToTop(getId(item))}
            />
        </span>
        <span className={styles.icon}>
            <FontAwesomeIcon
                title={direction === "vertical" ? "Move to bottom" : "Move to end"}
                icon={faForwardStep}
                rotation={direction === "vertical" ? 90 : undefined}
                onClick={moveToBottom(getId(item))}
            />
        </span>
        <span className={styles.content}>
            {children}
        </span>
    </div>;
}

export const SortableListComponent = <T extends any, Extra = {}>({
    items, getId, getListId,
    sortItems, moveToTop, moveToBottom,
    ItemComponent, itemProps,
    className, itemClassName,
    isActive, activeClassName,
    direction = "vertical",
}:SortableListProps<T, Extra>) =>
    <DndContext onDragEnd={sortItems}>
        <SortableContext items={items.map(getListId)} strategy={direction === "vertical" ? verticalListSortingStrategy : horizontalListSortingStrategy}>
            <div className={className}>
                {items.map((item, i) => <ListItem
                    className={clsx([itemClassName, isActive && isActive(item) && activeClassName])}
                    direction={direction}
                    key={getId(item)}
                    item={item}
                    getId={getId}
                    getListId={getListId}
                    index={i}
                    moveToTop={moveToTop}
                    moveToBottom={moveToBottom}
                >
                    <ItemComponent item={item} {...itemProps as Extra} />
                </ListItem>)}
            </div>
        </SortableContext>
    </DndContext>;
