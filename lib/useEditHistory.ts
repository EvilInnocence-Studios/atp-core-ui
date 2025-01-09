import { useState } from "react";

export declare interface IEditHistory<Entity> {
    entity: Entity;
    update: (newEntity:any) => void;
    undo: () => void;
    redo: () => void;
    index: number;
    length: number;
}

export const useEditHistory = <Entity>(
    initialEntity:Entity,
    updateEntity: (data:Partial<Entity>) => Promise<Entity>,
):IEditHistory<Entity> => {
    const [entity, setEntity] = useState<Entity>(initialEntity);
    const [history, setHistory] = useState<Entity[]>([]);
    const [index, setIndex] = useState<number>(0);

    const update = (newEntity:Entity) => {
        setEntity(newEntity);
        setHistory([...history.slice(0, index), {...newEntity}]);
        setIndex(index + 1);
    }

    const undo = () => {
        if(index > 0) {
            setIndex(index - 1);
            updateEntity(history[index - 2]);
            setEntity(history[index - 2]);
        }
    }

    const redo = () => {
        if(index < history.length) {
            setIndex(index + 1);
            updateEntity(history[index]);
            setEntity(history[index]);
        }
    }

    return {
        entity, update, undo, redo, index, length: history.length,
    };
}