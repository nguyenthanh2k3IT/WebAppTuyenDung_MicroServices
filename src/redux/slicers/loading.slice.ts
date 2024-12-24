import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
    box: Record<string, boolean | undefined>;
};

export const loadingInitialState: LoadingState = {
    box: {},
};

const slice = createSlice({
    name: 'loading',
    initialState: loadingInitialState,
    reducers: {
        setLoadingAction(state, { payload }: PayloadAction<[string, boolean | undefined]>) {
            state.box[payload[0]] = payload[1];
        },
        clearLoadingAction(state, { payload }: PayloadAction<string[]>) {
            for (const key of payload) {
                delete state.box[key];
            }
        },
    },
});

export const { setLoadingAction, clearLoadingAction } = slice.actions;
export default slice.reducer;
