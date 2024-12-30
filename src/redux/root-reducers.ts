import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profile, { profileInitialState, ProfileState } from './slicers/profile.slice';

export type RawRootState = {
    profile: ProfileState;
};

export const allInitialStates: RawRootState = {
    profile: profileInitialState,
};

const rootReducer = combineReducers({
    profile,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
