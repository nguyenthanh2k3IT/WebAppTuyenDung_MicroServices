import { useDispatch } from 'react-redux';
import { useRootSelector } from './useRootSelector';
import {
    clearProductFilterState,
    productFilterNextPage,
    productFilterPrevPage,
    ProductFilterState,
    setProductFilter,
} from '@/redux/slicers/product-filter.slice';

function useProductFilter() {
    const dispatch = useDispatch();
    const filter = useRootSelector((state) => state.productFilter);

    const setFilter = (payload: ProductFilterState) => {
        dispatch(setProductFilter(payload));
    };

    const nextPage = () => {
        dispatch(productFilterNextPage());
    };

    const prevPage = () => {
        dispatch(productFilterPrevPage());
    };

    const clearFilter = () => {
        dispatch(clearProductFilterState());
    };

    const searchOutsideProductPage = (search: string) => {
        const payload: ProductFilterState = {
            pageIndex: 1,
            pageSize: 16,
            textSearch: search,
            brand: undefined,
            category: undefined,
            gender: undefined,
            sale: undefined,
            price: undefined,
            sort: undefined,
        };
        dispatch(setProductFilter(payload));
    };

    const createParams = (option: ProductFilterState) => {
        const queryParams = new URLSearchParams();

        // Kiểm tra textSearch từ option trước, sau đó mới kiểm tra filter
        if (option.textSearch) {
            queryParams.append('q', option.textSearch);
        } else if (filter.textSearch) {
            queryParams.append('q', filter.textSearch);
        }

        // Kiểm tra category từ option trước, sau đó mới kiểm tra filter
        if (option.category) {
            queryParams.append('category', option.category);
        } else if (filter.category) {
            queryParams.append('category', filter.category);
        }

        // Kiểm tra gender từ option trước, sau đó mới kiểm tra filter
        if (option.gender) {
            queryParams.append('gender', option.gender);
        } else if (filter.gender) {
            queryParams.append('gender', filter.gender);
        }

        // Kiểm tra brand từ option trước, sau đó mới kiểm tra filter
        if (option.brand) {
            queryParams.append('brand', option.brand);
        } else if (filter.brand) {
            queryParams.append('brand', filter.brand);
        }

        // Kiểm tra isSale từ option trước, sau đó mới kiểm tra filter
        if (option.sale !== undefined) {
            queryParams.append('sale', option.sale.toString());
        } else if (filter.sale !== undefined) {
            queryParams.append('sale', filter.sale.toString());
        }

        // Kiểm tra sort từ option trước, sau đó mới kiểm tra filter
        if (option.sort) {
            queryParams.append('sort', option.sort);
        } else if (filter.sort) {
            queryParams.append('sort', filter.sort);
        }

        // Kiểm tra priceFrom từ option trước, sau đó mới kiểm tra filter
        if (option.price !== undefined) {
            queryParams.append('price', option.price.toString());
        } else if (filter.price !== undefined) {
            queryParams.append('price', filter.price.toString());
        }

        // Kiểm tra pageIndex từ option trước, sau đó mới kiểm tra filter
        if (option.pageIndex) {
            queryParams.append('pageIndex', option.pageIndex.toString());
        } else if (filter.pageIndex) {
            queryParams.append('pageIndex', filter.pageIndex.toString());
        }

        // Kiểm tra pageSize từ option trước, sau đó mới kiểm tra filter
        if (option.pageSize) {
            queryParams.append('pageSize', option.pageSize.toString());
        } else if (filter.pageSize) {
            queryParams.append('pageSize', filter.pageSize.toString());
        }

        return queryParams.toString();
    };

    return { filter, setFilter, nextPage, prevPage, clearFilter, searchOutsideProductPage, createParams };
}

export default useProductFilter;
