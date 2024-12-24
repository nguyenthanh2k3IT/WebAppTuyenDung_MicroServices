import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loading, { loadingInitialState, LoadingState } from './slicers/loading.slice';
import breadcrumb, { breadcrumbInitialState, BreadcrumbState } from './slicers/breadcrumb.slice';
import toast, { toastInitialState, ToastState } from './slicers/toast.slice';
import profile, { profileInitialState, ProfileState } from './slicers/profile.slice';
import productFilter, { productFilterInitialState, ProductFilterState } from './slicers/product-filter.slice';
import cart, { cartInitialState, CartState } from './slicers/cart.slice';

export type RawRootState = {
    loading: LoadingState;
    breadcrumb: BreadcrumbState;
    toast: ToastState;
    profile: ProfileState;
    productFilter: ProductFilterState;
    cart: CartState;
};

export const allInitialStates: RawRootState = {
    loading: loadingInitialState,
    breadcrumb: breadcrumbInitialState,
    toast: toastInitialState,
    profile: profileInitialState,
    productFilter: productFilterInitialState,
    cart: cartInitialState,
};

const rootReducer = combineReducers({
    loading,
    breadcrumb,
    toast,
    profile,
    productFilter,
    cart,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
