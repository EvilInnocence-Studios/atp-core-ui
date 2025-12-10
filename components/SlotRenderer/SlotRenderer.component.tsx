import { ComponentRegistry } from "@core/lib/layout/componentRegistry";
import { overridable } from "@core/lib/overridable";
import { SlotRendererProps } from "./SlotRenderer.d";
import styles from "./SlotRenderer.module.scss";

import { useLocation } from "react-router-dom";
import { findMatchingRoute, isRouteTable } from "@core/lib/routeUtils";
import { useLayoutManager } from "@core/lib/layout/context";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteBtn } from "@core/components/DeleteBtn";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { cloneElement, isValidElement } from "react";

export const SelectableItem = ({
    id,
    children,
    selected,
    className,
    title,
    onSelect,
    onDelete,
    classes,
    depth = 0
}: {
    id: string,
    children: React.ReactNode,
    selected: boolean,
    className?: string,
    title?: string,
    onSelect: () => void,
    onDelete: () => void,
    classes?: any,
    depth?: number
}) => {
    // No useSortable here
    console.log('SelectableItem rendering', { id, selected, hasOnSelect: !!onSelect });

    const renderUi = () => (
        <>
            {selected && <div
                className={classes?.title}
                style={{
                    position: 'absolute',
                    zIndex: 100 + depth, // Higher depth = higher z-index
                    cursor: 'pointer',
                    padding: '2px 4px',
                    background: selected ? '#1890ff' : 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    borderRadius: '0 0 4px 0',
                    top: 0,
                    left: 0,
                    fontSize: '10px',
                    pointerEvents: 'auto'
                }}
                // onClick handled by parent wrapper now
                data-selected={selected}
            >
                <span>{title}</span>
                <DeleteBtn onClick={onDelete} entityType="Component" />
            </div>}
        </>
    );

    return (
        <div 
            className={className}
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            data-selected={selected}
            style={{ 
                position: 'relative', 
                border: selected ? '2px solid #1890ff' : '1px dashed transparent',
                boxSizing: 'border-box',
                // @ts-ignore
                '--depth': depth
            }}
        >
            {children}
            {renderUi()}
        </div>
    );
};

export const SortableItem = ({
    id,
    children,
    selected,
    className,
    title,
    onSelect,
    onDelete,
    classes,
    data,
    depth = 0
}: {
    id: string,
    children: React.ReactNode,
    selected: boolean,
    className?: string,
    title?: string,
    onSelect: () => void,
    onDelete: () => void,
    classes?: any,
    data?: any,
    depth?: number
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id, data });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    const renderUi = () => (
        <>
            {selected && <div
                className={classes?.title}
                style={{
                    position: 'absolute',
                    zIndex: 100 + depth, // Higher depth = higher z-index
                    cursor: 'pointer',
                    padding: '2px 4px',
                    background: selected ? '#1890ff' : 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    borderRadius: '0 0 4px 0',
                    top: 0,
                    left: 0,
                    fontSize: '10px',
                    pointerEvents: 'auto'
                }}
                onClick={(e) => { e.stopPropagation(); onSelect(); }}
                data-selected={selected}
            >
                <span ref={setActivatorNodeRef} {...listeners} style={{ cursor: 'grab', marginRight: '4px' }}>
                    <FontAwesomeIcon icon={faGrip} />
                </span>
                <span>{title}</span>
                <DeleteBtn onClick={onDelete} entityType={`${title} component`} />
            </div>}
        </>
    );

    // We clone the child to pass the 'dnd' prop
    const child = isValidElement(children)
        ? cloneElement(children as React.ReactElement<any>, {
            className: `${children.props.className || ''} ${className || ''}`,
            "data-selected": selected,
            dnd: {
                ref: setNodeRef,
                attributes,
                listeners,
                renderUi,
                depth,
                selected,
                onSelect // Pass onSelect so container can handle clicks
            },
                style: {
                    ...children.props.style,
                    ...style,
                    position: 'relative', // Ensure relative for absolute handle
                    border: selected ? '2px solid #1890ff' : '1px dashed transparent',
                    boxSizing: 'border-box',
                    '--depth': depth
                } as React.CSSProperties
        })
        : <>a{children}</>;

    return child;
};

export const SlotRendererComponent = overridable(({ slots, parentId, slotName, classes = styles, depth = 0, componentName }: SlotRendererProps & { depth?: number }) => {
    const location = useLocation();
    const { layout, selectedId, selectComponent, removeComponent } = useLayoutManager();
    const isEditing = !!layout;

    const droppableId = (parentId && slotName) ? `${parentId}:${slotName}` : undefined;
    const { setNodeRef, isOver } = useDroppable({
        id: droppableId || 'unknown-slot',
        disabled: !isEditing || !droppableId,
        data: {
            parentId,
            slotName
        }
    });

    const content = slots?.map((item, index) => {
        // Check if item is a RouteTable
        if (isRouteTable(item)) {
            const matchingComponents = findMatchingRoute(item, location.pathname);
            if (!matchingComponents) return null;

            return <SlotRendererComponent key={`route-match-${index}`} slots={matchingComponents} parentId={parentId} slotName={slotName} depth={depth} componentName={componentName} />
        }

        // Standard Component
        const { component, props, slots, css, id } = item;
        const Component: React.ComponentType<any> | undefined = !!component
            ? ComponentRegistry.get(component)?.component
            : undefined;

        const itemContent = Component ? (
            <Component {...props} slots={slots} layoutId={id} css={css} />
        ) : null;

        if (isEditing && id) {
            return <SortableItem 
                key={id} 
                id={id} 
                selected={selectedId === id}
                className={classes.item}
                title={component}
                onSelect={() => selectComponent(id)}
                onDelete={() => removeComponent(id)}
                classes={classes}
                depth={depth}
            >
                {itemContent}
            </SortableItem>;
        }

        return itemContent;
    });

    const itemIds = slots?.map(s => (s as any).id).filter(Boolean) || [];

    if (isEditing && droppableId) {
        const hasItems = slots && slots.length > 0;
        return <div 
            style={{ 
                display: hasItems ? 'contents' : undefined,
                // If empty, behave like a block
                minHeight: hasItems ? undefined : '50px',
                backgroundColor: (isOver && !hasItems) ? 'rgba(0, 255, 0, 0.1)' : undefined,
                border: (!hasItems && isEditing) ? '1px dashed #ccc' : undefined,
                padding: (!hasItems) ? '20px' : undefined,
                width: (!hasItems) ? '100%' : undefined,
                textAlign: (!hasItems) ? 'center' : undefined,
            }}
            // If empty, we attach ref here. If not empty, we attach ref to the filler.
            ref={!hasItems ? setNodeRef : undefined}
        >
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                {content}
            </SortableContext>
            
            {!hasItems && (
                <div>
                    Drop {componentName} {slotName} components here
                </div>
            )}

            {/* Filler Drop Target for non-empty lists */}
            {hasItems && (
                <div 
                    ref={setNodeRef}
                    style={{
                        flexGrow: 1,
                        minWidth: '20px',
                        minHeight: '20px',
                        display: 'block', 
                        backgroundColor: isOver ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
                        alignSelf: 'stretch'
                    }}
                />
            )}
        </div>;
    }

    return <>{content}</>;
});
