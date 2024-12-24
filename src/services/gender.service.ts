import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';

export default class GenderService {
    static async getAll(): Promise<Gender[]> {
        try {
            const res = await API.get(APIEndpoint.genderRoot);
            const obj: ApiRes<Gender[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
}
