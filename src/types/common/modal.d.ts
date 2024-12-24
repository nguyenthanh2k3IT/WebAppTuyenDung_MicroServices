interface ModalContextType {
    modals: Record<string, ModalState>;
    openModal: (key: string, data?: any, callback?: () => void) => void;
    closeModal: (key: string) => void;
}
