import { Dispatch } from 'react';
import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import rootReducer, { RootState } from './root-reducers';

const initStore = (preloadedState?: RootState) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState as any,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });

    return store;
};

export const reduxStore = initStore();
export const persistor = persistStore(reduxStore);

export type Store = ReturnType<typeof initStore>;

export type AppDispatch = ThunkDispatch<any, null, AnyAction> &
    ThunkDispatch<any, undefined, AnyAction> &
    Dispatch<AnyAction>;

export type AppThunk<T = any> = ThunkAction<Promise<T>, RootState, unknown, Action<string>>;
