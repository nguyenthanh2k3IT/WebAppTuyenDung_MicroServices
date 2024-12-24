import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProductFilterState = {
    pageIndex: number;
    pageSize: number;
    textSearch?: string;
    category?: string;
    gender?: string;
    brand?: string;
    sale?: string;
    sort?: string;
    price?: string;
};

export const productFilterInitialState: ProductFilterState = {
    pageIndex: 1,
    pageSize: 16,
    textSearch: '',
};

const slice = createSlice({
    name: 'product-filter',
    initialState: productFilterInitialState,
    reducers: {
        productFilterNextPage(state) {
            state.pageIndex = state.pageIndex + 1;
        },
        productFilterPrevPage(state) {
            if (state.pageIndex > 0) state.pageIndex = state.pageIndex - 1;
        },
        clearProductFilterState(state) {
            state.pageIndex = 1;
            state.pageSize = 16;
            state.textSearch = '';
            state.category = undefined;
            state.gender = undefined;
            state.brand = undefined;
            state.sale = undefined;
            state.sort = undefined;
            state.price = undefined;
        },
        setProductFilter(state, action: PayloadAction<Partial<ProductFilterState>>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setProductFilter, productFilterNextPage, productFilterPrevPage, clearProductFilterState } =
    slice.actions;
export default slice.reducer;
