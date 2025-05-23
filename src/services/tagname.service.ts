import { API } from '@/utils/axios';

export default class TagnameService {
    static async getAll(): Promise<Tagname[]> {
        try {
            const res = await API.get('/blog-service/api/Tagnames');
            const obj: ApiRes<Tagname[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch tag names:', error);
            return [];
        }
    }
} 