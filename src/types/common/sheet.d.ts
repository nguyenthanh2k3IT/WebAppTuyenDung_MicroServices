interface SheetContextType {
    sheets: Record<string, ModalState>;
    openSheet: (key: string, data?: any) => void;
    closeSheet: (key: string) => void;
}
