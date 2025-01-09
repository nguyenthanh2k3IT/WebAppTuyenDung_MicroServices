import { API } from '@/utils/axios';

export default class ProvinceService {
    static async getAll(): Promise<Province[]> {
        try {
            const res = await API.get('/identity-service/api/Province');
            const obj: ApiRes<Province[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch provinces:', error);
            return [];
        }
    }
}