import { useEffect, useState } from 'react';

// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearchTerm = useDebounce(searchTerm, 500); // Trì hoãn 500ms

function useDebounce<T>(value: T, delay: number, callback?: () => void): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
            if (callback) callback();
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
