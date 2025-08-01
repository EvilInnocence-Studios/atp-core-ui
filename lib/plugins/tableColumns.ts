import { ColumnType } from "antd/es/table";
import { Index } from "ts-functional/dist/types";

export declare type ColumnGenerator<T, P> = (props:P) => ColumnType<T>;
export declare type ColumnList<T, P> = Index<ColumnGenerator<T, P>>;

// TODO: Figure out how to pass hooks/data/ect. into the columns when rendering
// perhaps pass data into the getColumnSet and getAllColumns functions, and register column getter's instead of raw columns

export declare interface IColumnPlugin<T, P> {
    key: string;
    column: (props:P) => ColumnType<T>;
}

const registerColumnPlugin = <T, P>(slots: ColumnList<T, P>) => (plugin: IColumnPlugin<T, P>) => {
    slots[plugin.key as string] = plugin.column;
    return slots;
}

export declare interface ITableColumnSetItem {
    priority: number;
    key: string;
}

export declare type ColumnSets = Index<ITableColumnSetItem[]>;

const registerColumnSet = (sets: ColumnSets) => (name: string, items: ITableColumnSetItem[]) => {
    if (!sets[name]) {
        sets[name] = [];
    }
    sets[name].push(...items);
    sets[name].sort((a, b) => b.priority - a.priority);
    return sets;
}

export const tableColumns = <T, P>() => {
    const sets = {} as ColumnSets;
    const columns = {} as ColumnList<T, P>;
    return {
        registerColumn: registerColumnPlugin(columns),
        registerColumnSet: registerColumnSet(sets),
        sets: () => Object.keys(sets),
        getColumnSet: (index:string, props:P):ColumnType<T>[] => 
            (sets[index] || []).map(item => {
                const columnGenerator = columns[item.key];
                if (!columnGenerator) {
                    throw new Error(`Column "${item.key}" does not exist in set "${index}".`);
                }
                return columnGenerator(props);
            }),
        getAllColumns: (props:P):ColumnType<T>[] => Object.values(columns).map(f => f(props)),
    };
}
