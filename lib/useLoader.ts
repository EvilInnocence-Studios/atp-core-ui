import { useState } from "react";

export const useLoader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [, setInvocationCount] = useState(0);

    const start = () => {
        setInvocationCount(prevCount => prevCount + 1);
        setIsLoading(true);
    };

    const stop = () => {
        setInvocationCount(prevCount => {
            const newCount = Math.max(prevCount - 1, 0);
            if (newCount === 0) {
                setIsLoading(false);
                return 0;
            }
            return newCount;
        });
    };

    return {isLoading, start, stop};
}

// LoaderAsync is a type that is a function that also has a single property isLoading of type boolean
export type LoaderAsync = {
    (f: () => Promise<any>): void;
    isLoading: boolean;
}

export const useLoaderAsync = ():LoaderAsync => {
    const [isLoading, setIsLoading] = useState(false);
    const [, setInvocationCount] = useState(0);

    const start = () => {
        setInvocationCount(prevCount => prevCount + 1);
        setIsLoading(true);
    };

    const stop = () => {
        setInvocationCount(prevCount => {
            const newCount = Math.max(prevCount - 1, 0);
            if (newCount === 0) {
                setIsLoading(false);
                return 0;
            }
            return newCount;
        });
    };

    const loader = async (f: () => Promise<any>) => {
        start();
        try {
            await f();
        } finally {
            stop();
        }
    };

    loader.isLoading = isLoading;

    return loader;
}