import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastState = {
    box: Record<string, ToastOptions | undefined>;
};

export const toastInitialState: ToastState = {
    box: {},
};

const slice = createSlice({
    name: 'toast',
    initialState: toastInitialState,
    reducers: {
        setToastAction(state, { payload }: PayloadAction<[string, ToastOptions | undefined]>) {
            state.box[payload[0]] = payload[1];
        },
        clearToastAction(state, { payload }: PayloadAction<string[]>) {
            for (const key of payload) {
                delete state.box[key];
            }
        },
    },
});

export const { setToastAction, clearToastAction } = slice.actions;
export default slice.reducer;
