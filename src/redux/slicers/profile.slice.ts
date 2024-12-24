import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type ProfileState = {
    user: Profile | null;
};

export const profileInitialState: ProfileState = {
    user: null,
};

const slice = createSlice({
    name: 'Profile',
    initialState: profileInitialState,
    reducers: {
        setProfileAction(state, { payload }: PayloadAction<Profile>) {
            state.user = payload;
        },
        clearProfileAction(state) {
            state.user = null;
        },
    },
});

const persistConfig = {
    key: 'profile',
    storage,
    whitelist: ['user'], // Chỉ lưu trữ trường 'user'
};

export const { setProfileAction, clearProfileAction } = slice.actions;
export default persistReducer(persistConfig, slice.reducer);
