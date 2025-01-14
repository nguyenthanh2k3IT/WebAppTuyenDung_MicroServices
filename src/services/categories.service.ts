import { API } from '@/utils/axios';

export default class CategoryService {
    static async getAll(): Promise<Category[]> {
        try {
            const res = await API.get('/blog-service/api/Categories');
            const obj: ApiRes<Category[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
} 