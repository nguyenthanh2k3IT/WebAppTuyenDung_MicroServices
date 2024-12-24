import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface CartState {
    loading: boolean;
    cart?: Cart | null;
}

export const cartInitialState: CartState = {
    loading: false,
    cart: undefined,
};

const showToast = (succeeded: boolean, errMsg: string, msg?: string) => {
    if (succeeded && msg) {
        toast.success(msg, {
            position: 'bottom-right',
            autoClose: 1500,
        });
    } else if (!succeeded) {
        toast.error(errMsg, {
            position: 'bottom-right',
            autoClose: 1500,
        });
    }
};

export const getCartThunk = createAsyncThunk('getCartThunk', async () => {
    try {
        const res = await API.get(APIEndpoint.cartRoot);
        const obj: ApiRes<Cart> = res.data;
        return obj.data;
    } catch (e) {
        console.log('getCartThunk', e);
        return null;
    }
});

export const addProductThunk = createAsyncThunk('addProductThunk', async (id: string) => {
    try {
        const res = await API.post(APIEndpoint.cartAddProduct(id));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage, 'Add product to cart successfully');
        return obj.data;
    } catch (e) {
        console.log('addProductThunk', e);
        return null;
    }
});

export const removeProductThunk = createAsyncThunk('removeProductThunk', async (id: string) => {
    try {
        const res = await API.delete(APIEndpoint.cartRemoveProduct(id));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage, 'Remove product from cart successfully');
        return obj.data;
    } catch (e) {
        console.log('removeProductThunk', e);
        return null;
    }
});

export const increaseQuantityThunk = createAsyncThunk('increaseQuantityThunk', async (id: string) => {
    try {
        const res = await API.post(APIEndpoint.increaseQuantity(id));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage);
        return obj.data;
    } catch (e) {
        console.log('increaseQuantityThunk', e);
        return null;
    }
});

export const decreaseQuantityThunk = createAsyncThunk('decreaseQuantityThunk', async (id: string) => {
    try {
        const res = await API.delete(APIEndpoint.decreaseQuantity(id));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage);
        return obj.data;
    } catch (e) {
        console.log('decreaseQuantityThunk', e);
        return null;
    }
});

export const applyDiscountThunk = createAsyncThunk('applyDiscountThunk', async (code: string) => {
    try {
        const res = await API.post(APIEndpoint.applyDiscount(code));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage, 'Apply discount successfully');
        return obj.data;
    } catch (e) {
        console.log('applyDiscountThunk', e);
        return null;
    }
});

export const removeDiscountThunk = createAsyncThunk('removeDiscountThunk', async (code: string) => {
    try {
        const res = await API.delete(APIEndpoint.removeDiscount(code));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage, 'Remove discount successfully');
        return obj.data;
    } catch (e) {
        console.log('removeDiscountThunk', e);
        return null;
    }
});

export const applyPointThunk = createAsyncThunk('applyPointThunk', async (point: string) => {
    try {
        const res = await API.post(APIEndpoint.applyPoint(point));
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage, 'Apply point successfully');
        return obj.data;
    } catch (e) {
        console.log('applyPointThunk', e);
        return null;
    }
});

export const removePointThunk = createAsyncThunk('removePointThunk', async () => {
    try {
        const res = await API.delete(APIEndpoint.removePoint());
        const obj: ApiRes<Cart> = res.data;
        showToast(obj.succeeded, obj.errorMessage, 'Remove point successfully');
        return obj.data;
    } catch (e) {
        console.log('removePointThunk', e);
        return null;
    }
});

export const slice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // *********** get cart
            .addCase(getCartThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(getCartThunk.rejected, (state) => {
                state.loading = false;
                state.cart = undefined;
            })

            // *********** add product
            .addCase(addProductThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProductThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(addProductThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** remove product
            .addCase(removeProductThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProductThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(removeProductThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** increase product
            // .addCase(increaseQuantityThunk.pending, (state) => {
            //     state.loading = true;
            // })
            .addCase(increaseQuantityThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(increaseQuantityThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** decrease product
            // .addCase(decreaseQuantityThunk.pending, (state) => {
            //     state.loading = true;
            // })
            .addCase(decreaseQuantityThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(decreaseQuantityThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** decrease product
            .addCase(applyDiscountThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(applyDiscountThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(applyDiscountThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** decrease product
            .addCase(removeDiscountThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeDiscountThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(removeDiscountThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** apply point
            .addCase(applyPointThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(applyPointThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(applyPointThunk.rejected, (state) => {
                state.loading = false;
            })

            // *********** remove point
            .addCase(removePointThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(removePointThunk.fulfilled, (state, action: PayloadAction<Cart | null>) => {
                state.loading = false;
                if (action.payload) state.cart = action.payload;
            })
            .addCase(removePointThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const {} = slice.actions;
export default slice.reducer;
