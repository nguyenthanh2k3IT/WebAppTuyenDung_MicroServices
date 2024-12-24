import { SheetType } from '@/enums/sheet.enum';
import React, { createContext, useState, ReactNode } from 'react';

interface SheetState {
    visible: boolean;
    data: any;
}

export const SheetContext = createContext<SheetContextType | undefined>(undefined);

interface SheetProviderProps {
    children: ReactNode;
}

export const SheetProvider: React.FC<SheetProviderProps> = ({ children }) => {
    const [sheets, setSheets] = useState<Record<SheetType, SheetState>>({
        [SheetType.HomeSidebar]: { visible: false, data: null },
        [SheetType.AdminSidebar]: { visible: false, data: null },
        [SheetType.CommentSheet]: { visible: false, data: null },
    });

    const openSheet = (key: string, data?: any) => {
        setSheets((prev) => ({
            ...prev,
            [key]: { visible: true, data },
        }));
    };

    const closeSheet = (key: string) => {
        setSheets((prev) => ({
            ...prev,
            [key]: { visible: false, data: null },
        }));
    };

    return <SheetContext.Provider value={{ sheets, openSheet, closeSheet }}>{children}</SheetContext.Provider>;
};
