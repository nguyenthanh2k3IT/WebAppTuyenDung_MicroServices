import { API } from '@/utils/axios';

export default class WorktypeService {
    static async getAll(): Promise<Worktype[]> {
        try {
            const res = await API.get('/job-service/api/WorkType');
            const obj: ApiRes<Worktype[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch work type:', error);
            return [];
        }
    }
} 