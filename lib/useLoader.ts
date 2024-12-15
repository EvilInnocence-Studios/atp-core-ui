import { useEffect, useState } from "react";

export const useLoader = <T>(loader: () => Promise<T>, initialValue:T, dependencies:any[] = []) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<T>(initialValue);

    const load = async () => {
        setIsLoading(true);
        try {
            await loader().then(setData);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, dependencies);

    return {data, isLoading, error, load};
}