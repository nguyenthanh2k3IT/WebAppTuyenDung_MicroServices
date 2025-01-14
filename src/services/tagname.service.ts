import { API } from '@/utils/axios';

export default class tagnameService {
    static async getAll(): Promise<Tagname[]> {
        try {
            const res = await API.get('/blog-service/api/Categories');
            const obj: ApiRes<Tagname[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch tag names:', error);
            return [];
        }
    }
} 