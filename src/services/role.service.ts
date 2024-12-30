import { API } from '@/utils/axios';

export default class RoleService {
    static async getAll(): Promise<Role[]> {
        try {
            const res = await API.get('/identity-service/api/Role');
            const obj: ApiRes<Role[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return [];
        }
    }
}
