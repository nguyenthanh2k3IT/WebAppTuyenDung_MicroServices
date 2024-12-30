import { ModalType } from '@/enums/modal.enum';
import React, { createContext, useState, ReactNode } from 'react';

interface ModalState {
    visible: boolean;
    data: any;
    callback?: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modals, setModals] = useState<Record<ModalType, ModalState>>({
        [ModalType.UpdatePassword]: { visible: false, data: null },
        [ModalType.CreateUser]: { visible: false, data: null },
        [ModalType.UpdateUser]: { visible: false, data: null },
    });

    const openModal = (key: string, data?: any, callback?: () => void) => {
        setModals((prev) => ({
            ...prev,
            [key]: { visible: true, data, callback },
        }));
    };

    const closeModal = (key: string) => {
        setModals((prev) => ({
            ...prev,
            [key]: { visible: false, data: null, callback: null },
        }));
    };

    return <ModalContext.Provider value={{ modals, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
