import { useMemo } from 'react';
import { useRootSelector } from './useRootSelector';

export function useWatchLoading(...keys: (string | [string, boolean])[]) {
    const box = useRootSelector((state) => {
        const box = state.loading.box;
        return keys.map((key) => {
            const [k, defaultValue = undefined] = Array.isArray(key) ? key : [key];
            return box[k] ?? defaultValue;
        });
    });

    return useMemo(() => {
        return box.filter((el) => el != null) as boolean[];
    }, [box]);
}
