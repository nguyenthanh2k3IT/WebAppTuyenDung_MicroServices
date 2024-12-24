import React from 'react';

function useTableRef() {
    const tableRef = React.useRef<{ onFetch: () => void }>(null);

    const onFetch = React.useCallback(() => {
        if (tableRef.current) {
            tableRef.current.onFetch();
        }
    }, []);

    return React.useMemo(() => ({ tableRef, onFetch }), [onFetch]);
}

export default useTableRef;
