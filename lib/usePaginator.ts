import { useState } from "react";

export declare interface IPaginator {
    current: number;
    pageSize: number;
    onChange: (page: number, pageSize: number) => void;
    showTotal: (total: number, range: [number, number]) => string;
}

export const usePaginator = ():IPaginator => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return {
        current,
        pageSize,
        onChange: (page: number, pageSize: number) => {
            console.log('page', page);
            console.log('pageSize', pageSize);
            setCurrent(page);
            setPageSize(pageSize);
        },
        showTotal: (total: number, range: [number, number]) => {
            return `${range[0]} - ${range[1]} of ${total}`;
        },
    };
}
