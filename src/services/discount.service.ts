import { API } from '@/utils/axios';

export default class DiscountService {
    static async getByProduct(ids: string): Promise<SelectOption[]> {
        try {
            const res = await API.get(`/promotion-service/api/Discount/product/option/${ids}`);
            const obj: ApiRes<SelectOption[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
}
