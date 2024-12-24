import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function useParameter(keys: string[]): Record<string, string> {
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const params = useMemo(() => {
        return keys.reduce<Record<string, string>>((acc, key) => {
            const value = queryParams.get(key);
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});
    }, [queryParams, keys]);

    return params;
}

export default useParameter;
