import { API } from '@/utils/axios';

export default class SizeService {
    static async getAll(): Promise<Size[]> {
        try {
            const res = await API.get('/identity-service/api/Size');
            const obj: ApiRes<Size[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch sizes:', error);
            return [];
        }
    }
}