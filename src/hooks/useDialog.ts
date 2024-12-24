import { useState } from 'react';

interface DialogState {
    visible: boolean;
    data: any;
}

type DialogStates = {
    [key: string]: DialogState;
};

function useDialog(keys: string[]) {
    const [dialogs, setDialogs] = useState<DialogStates>(() => {
        const initialState: DialogStates = {};
        keys.forEach((key) => {
            initialState[key] = {
                visible: false,
                data: null,
            };
        });
        return initialState;
    });

    const setDialogState = (key: string, newState: Partial<DialogState>) => {
        setDialogs((prevState) => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                ...newState,
            },
        }));
    };

    const openDialog = (key: string, data: any = null) => {
        if (key in dialogs) {
            setDialogState(key, { visible: true, data });
        }
    };

    const closeDialog = (key: string) => {
        if (key in dialogs) {
            setDialogState(key, { visible: false, data: null });
        }
    };

    return { dialogs, openDialog, closeDialog };
}

export default useDialog;
