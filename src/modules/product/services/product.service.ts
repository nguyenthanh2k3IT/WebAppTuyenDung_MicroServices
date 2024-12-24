import { ProductFilterState } from '@/redux/slicers/product-filter.slice';
import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';

export default class ProductService {
    static async getPaginationOverview(params: ProductFilterState): Promise<PaginatedData<ProductOverview> | null> {
        try {
            const payload: ProductFilterState = {
                ...params,
                sale: params.sale === 'all' ? undefined : params.sale,
            };
            const res = await API.get(APIEndpoint.productOverview, {
                params: payload,
            });
            const obj: ApiRes<PaginatedData<ProductOverview>> = res.data;
            return obj.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return null;
        }
    }

    static async getSimilarOverview(slug: string, take: number): Promise<ProductOverview[] | null> {
        try {
            const res = await API.get(APIEndpoint.productSimilar(slug, take));
            const obj: ApiRes<ProductOverview[]> = res.data;
            return obj.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return null;
        }
    }

    static async getFullInfo(slug: string): Promise<ProductDetail | null> {
        try {
            const res = await API.get(APIEndpoint.productFullInfo(slug));
            const obj: ApiRes<ProductDetail> = res.data;
            return obj.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return null;
        }
    }
}
