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
