import { API } from '@/utils/axios';

export default class CompanyService {
    static async getAll(): Promise<Company[]> {
        try {
            const res = await API.get('/identity-service/api/Company');
            const obj: ApiRes<Company[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch companies:', error);
            return [];
        }
    }
} 