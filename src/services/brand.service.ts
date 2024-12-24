import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';

export default class BrandService {
    static async getAll(): Promise<Brand[]> {
        try {
            const res = await API.get(APIEndpoint.brandRoot);
            const obj: ApiRes<Brand[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
}
