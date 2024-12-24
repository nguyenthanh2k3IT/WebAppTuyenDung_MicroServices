import React, { useRef } from 'react';

function useExpandableListRef() {
    const listRef = useRef<any>(null);

    const handleRemove = (id: string | number) => {
        if (listRef.current) {
            listRef.current.handleRemoveItem(id);
        }
    };

    const handleModify = (id: string | number, modifiedData: any) => {
        if (listRef.current) {
            listRef.current.handleModifiedItem(id, modifiedData);
        }
    };

    return React.useMemo(() => ({ listRef, handleRemove, handleModify }), [handleRemove, handleModify]);
}

export default useExpandableListRef;
