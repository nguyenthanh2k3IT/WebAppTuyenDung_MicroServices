import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const updateMatch = () => setMatches(mediaQueryList.matches);

        updateMatch();
        mediaQueryList.addEventListener('change', updateMatch);

        return () => mediaQueryList.removeEventListener('change', updateMatch);
    }, [query]);

    return matches;
};

export { useMediaQuery };
