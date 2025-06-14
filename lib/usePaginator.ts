import { useSetting } from "@common/lib/setting/services";
import { Index } from "ts-functional/dist/types";

export declare interface IPaginator {
    current: number;
    pageSize: number;
    defaultPageSize: number;
    pageSizeOptions: number[];
    onChange: (page: number, pageSize: number) => void;
}

export const usePaginator = (current:string, pageSize: string, update:(params:Index<string>) => void):IPaginator => {
    const defaultPageSize = parseInt(useSetting("defaultPageSize"));
    const pageSizeOptions = (useSetting("pageSizeOptions") || "").split(",").map(Number);

    return {
        current: parseInt(current),
        pageSize: parseInt(pageSize),
        defaultPageSize,
        pageSizeOptions,
        onChange: (page: number, pageSize: number) => {
            console.log("Page change", page, pageSize);
            update({page: page.toString(), perPage: pageSize.toString()});
        },
    };
}
