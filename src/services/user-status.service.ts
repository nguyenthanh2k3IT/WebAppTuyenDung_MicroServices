import { API } from '@/utils/axios';

export default class UserStatusService {
    static async getAll(): Promise<UserStatus[]> {
        try {
            const res = await API.get('/identity-service/api/Status');
            const obj: ApiRes<UserStatus[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
}
