import { API } from '@/utils/axios';

export default class JobCategoryService {
    static async getAll(): Promise<JobCategory[]> {
        try {
            const res = await API.get('/job-service/api/Category');
            const obj: ApiRes<JobCategory[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch job category:', error);
            return [];
        }
    }
}