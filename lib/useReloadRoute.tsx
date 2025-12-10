import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useLocalStorage } from "unstateless";

export const useReloadRoute = () => {
    const location = useLocation();

    // One key per path so different routes don't interfere
    const storageKey = `reload:${location.pathname}`;

    // Assuming: const [value, setValue] = useLocalStorage.string(key, defaultValue);
    const [flag, setFlag] = useLocalStorage.string(storageKey, "idle")();

    useEffect(() => {
        // On first visit (or after being reset) -> arm and reload
        if (flag !== "armed") {
            setFlag("armed");
            window.location.reload();
        } else {
            // After the reload, we see "armed" once and immediately disarm
            // so the next navigation to this route can reload again.
            setFlag("idle");
        }
        // Intentionally *not* depending on `flag` or `setFlag` so we don't rerun
        // when localStorage state changes; we only care about path changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
};

export const withReloadRoute = (Component: React.ComponentType) => {
    const Wrapped: React.FC = (props) => {
        useReloadRoute();
        return <Component {...props} />;
    };

    return Wrapped;
};
