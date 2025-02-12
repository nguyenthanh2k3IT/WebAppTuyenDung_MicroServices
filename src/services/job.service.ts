import { API } from '@/utils/axios';

export default class JobService {
    static async getAll(): Promise<Job[]> {
        try {
            const res = await API.get('/job-service/api/Job');
            const obj: ApiRes<Job[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch job:', error);
            return [];
        }
    }
} 