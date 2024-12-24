import { useDispatch } from 'react-redux';
import { useRootSelector } from './useRootSelector';
import {
    addProductThunk,
    applyDiscountThunk,
    applyPointThunk,
    decreaseQuantityThunk,
    getCartThunk,
    increaseQuantityThunk,
    removeDiscountThunk,
    removePointThunk,
    removeProductThunk,
} from '@/redux/slicers/cart.slice';
import type { AppDispatch } from '@/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;

function useCart() {
    const dispatch = useAppDispatch();
    const state = useRootSelector((state) => state.cart);

    const getCart = () => {
        dispatch(getCartThunk());
    };

    const addProduct = (id: string) => {
        dispatch(addProductThunk(id));
    };

    const removeProduct = (id: string) => {
        dispatch(removeProductThunk(id));
    };

    const increaseQuantity = (id: string) => {
        dispatch(increaseQuantityThunk(id));
    };

    const decreaseQuantity = (id: string) => {
        dispatch(decreaseQuantityThunk(id));
    };

    const applyDiscount = (code: string) => {
        dispatch(applyDiscountThunk(code));
    };

    const removeDiscount = (code: string) => {
        dispatch(removeDiscountThunk(code));
    };

    const applyPoint = (point: string) => {
        dispatch(applyPointThunk(point));
    };

    const removePoint = () => {
        dispatch(removePointThunk());
    };

    return {
        state,
        getCart,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        applyDiscount,
        removeDiscount,
        applyPoint,
        removePoint,
    };
}

export default useCart;
