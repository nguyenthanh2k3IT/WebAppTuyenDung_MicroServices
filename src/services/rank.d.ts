import { API } from '@/utils/axios';

export default class RankService {
    static async getAll(): Promise<Rank[]> {
        try {
            const res = await API.get('/job-service/api/Rank');
            const obj: ApiRes<Rank[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch ranks:', error);
            return [];
        }
    }
}