import { ModalContext } from '@/components/provider/modal.provider';
import { useContext } from 'react';

const useModalContext = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

export default useModalContext;
