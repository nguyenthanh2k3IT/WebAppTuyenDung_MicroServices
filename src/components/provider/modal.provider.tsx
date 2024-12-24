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
        [ModalType.OrderHistory]: { visible: false, data: null },
        [ModalType.DetailOrder]: { visible: false, data: null },
        [ModalType.Checkout]: { visible: false, data: null },
        [ModalType.UpdatePassword]: { visible: false, data: null },
        [ModalType.CreateUser]: { visible: false, data: null },
        [ModalType.UpdateUser]: { visible: false, data: null },
        [ModalType.CreateBrand]: { visible: false, data: null },
        [ModalType.UpdateBrand]: { visible: false, data: null },
        [ModalType.CreateColor]: { visible: false, data: null },
        [ModalType.UpdateColor]: { visible: false, data: null },
        [ModalType.CreateSize]: { visible: false, data: null },
        [ModalType.UpdateSize]: { visible: false, data: null },
        [ModalType.CreateDiscount]: { visible: false, data: null },
        [ModalType.UpdateDiscount]: { visible: false, data: null },
        [ModalType.CreateCategory]: { visible: false, data: null },
        [ModalType.UpdateCategory]: { visible: false, data: null },
        [ModalType.ProductImage]: { visible: false, data: null },
        [ModalType.CreateProductItem]: { visible: false, data: null },
        [ModalType.UpdateProductItem]: { visible: false, data: null },
        [ModalType.CreateVariation]: { visible: false, data: null },
        [ModalType.UpdateVariation]: { visible: false, data: null },
        [ModalType.AddRating]: { visible: false, data: null },
        [ModalType.UpdateOrder]: { visible: false, data: null },
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
