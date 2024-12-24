import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';

export default class WishlistService {
    static async add(product: string): Promise<boolean> {
        try {
            const res = await API.post(APIEndpoint.wishlistRoot, {
                ProductId: product,
            });
            const obj: ApiRes<boolean> = res.data;
            return obj.succeeded;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return false;
        }
    }

    static async delete(id: string): Promise<boolean> {
        try {
            const res = await API.delete(APIEndpoint.wishlistDelete(id));
            const obj: ApiRes<boolean> = res.data;
            return obj.succeeded;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return false;
        }
    }
}
