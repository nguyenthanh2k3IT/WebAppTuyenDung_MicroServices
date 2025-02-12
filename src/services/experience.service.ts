import { API } from '@/utils/axios';

export default class ExperienceService {
    static async getAll(): Promise<Experience[]> {
        try {
            const res = await API.get('/job-service/api/Experience');
            const obj: ApiRes<Experience[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch experience:', error);
            return [];
        }
    }
} 