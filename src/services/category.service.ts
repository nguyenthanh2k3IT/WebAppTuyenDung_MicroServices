import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';

export default class CategoryService {
    static async getAll(): Promise<Category[]> {
        try {
            const res = await API.get(APIEndpoint.categoryFilter);
            const obj: ApiRes<Category[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }

    static async getByGender(id: string): Promise<Category[]> {
        try {
            const res = await API.get(APIEndpoint.categoryByGender(id));
            const obj: ApiRes<Category[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }

    static async getByGenderSlug(slug: string): Promise<Category[]> {
        try {
            const res = await API.get(APIEndpoint.categoryByGenderSlug(slug));
            const obj: ApiRes<Category[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
}
