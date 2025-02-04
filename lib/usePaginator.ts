import { useState } from "react";

export declare interface IPaginator {
    current: number;
    pageSize: number;
    defaultPageSize: number;
    pageSizeOptions: number[];
    onChange: (page: number, pageSize: number) => void;
    showTotal: (total: number, range: [number, number]) => string;
}

export const usePaginator = ():IPaginator => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    return {
        current,
        pageSize,
        defaultPageSize: 12,
        pageSizeOptions: [12, 24, 48, 96],
        onChange: (page: number, pageSize: number) => {
            setCurrent(page);
            setPageSize(pageSize);
        },
        // showTotal: (total: number, range: [number, number]) => {
        //     return `${range[0]} - ${range[1]} of ${total}`;
        // },
    };
}
