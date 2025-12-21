import { faRedo, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space } from "antd";
import { useEffect } from "react";
import { flash } from "./flash";
import { IEditHistory, useEditHistory } from "./useEditHistory";
import { useLoader } from "./useLoader";
import { useToggle } from "./useToggle";
import { all } from "ts-functional";

export declare type EntityUpdater<E, T> = (field: keyof E) => (value: T) => void;

export declare interface IUpdater<Entity> {
    isLoading: boolean;
    updateString: EntityUpdater<Entity, string>;
    updateToggle: EntityUpdater<Entity, boolean>;
    updateNumber: EntityUpdater<Entity, number | null>;
    updateObject: EntityUpdater<Entity, any>;
    history: IEditHistory<Entity>;
    save: () => void;
    refresh: () => void;
    UpdateButtons: React.FC<{className?: string}>;
}

export const useUpdater = <Entity extends {}>(
    entityType: string,
    id:string,
    initialEntity:Entity,
    load:(id:string) => Promise<Entity>,
    update:(id:string, data:Partial<Entity>) => Promise<Entity>,
    saveMode: "automatic" | "manual" = "automatic",
    onUpdate: (data:Entity) => () => void = () => () => {},
):IUpdater<Entity> => {
    const dirty = useToggle(false);
    const loader = useLoader();

    const historyUpdate = (newEntity:Partial<Entity>) => {
        return update(id, newEntity);
    }

    const history = useEditHistory<Entity>(initialEntity, historyUpdate);

    const save = () => {
        loader.start();
        update(id, history.entity)
            .then(all(dirty.off, flash.success(`Saved ${entityType}`), onUpdate(history.entity)))
            .catch(flash.error(`Failed to save ${entityType}`))
            .finally(loader.stop);
    }

    const updateEntity = <FieldType extends any>(field:keyof Entity) => (value?:FieldType | null) => {
        if(typeof value !== "undefined") {
            const oldEntity = history.entity;
            (oldEntity as any)[field] = value;
            history.update(oldEntity);
            if(saveMode === "automatic") {
                save();
            } else {
                dirty.on();
            }
        }
    }

    const refresh = () => {
        loader.start();
        load(id)
            .then(history.update)
            .catch(flash.error(`Failed to load ${entityType}`))
            .finally(loader.stop);
    };

    useEffect(refresh, [id]);

    const UpdateButtons = ({className}:{className?:string}) => (
        <Space.Compact className={className}>
            <Button onClick={history.undo} disabled={history.index === 1 || history.length === 1}>
                <FontAwesomeIcon icon={faUndo} /> Undo
            </Button>
            <Button onClick={history.redo} disabled={history.index === history.length || history.length === 1}>
                <FontAwesomeIcon icon={faRedo} /> Redo
            </Button>
            {saveMode === "manual" && <Button type="primary" onClick={save} danger={dirty.isset}>
                <FontAwesomeIcon icon={faSave} /> Save
            </Button>}
        </Space.Compact>
    );

    return {
        isLoading: loader.isLoading,
        updateString: updateEntity<string>,
        updateToggle: updateEntity<boolean>,
        updateNumber: updateEntity<number>,
        updateObject: updateEntity<any>,
        history, save, UpdateButtons,
        refresh,
    };
};