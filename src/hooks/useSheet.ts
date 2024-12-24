import { SheetContext } from '@/components/provider/sheet.provider';
import { useContext } from 'react';

const useSheetContext = (): SheetContextType => {
    const context = useContext(SheetContext);
    if (context === undefined) {
        throw new Error('useSheetContext must be used within a SheetProvider');
    }
    return context;
};

export default useSheetContext;
