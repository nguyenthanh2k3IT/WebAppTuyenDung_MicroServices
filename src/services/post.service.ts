import { Post } from '@/types/identity/post';
import { API } from '@/utils/axios';

export default class PostService {
    static async getAll(): Promise<Post[]> {
        try {
            const res = await API.get('/blog-service/api/Post');
            const obj: ApiRes<Post[]> = res.data;
            return obj.data || [];
        } catch (error) {
            console.error('Failed to fetch post:', error);
            return [];
        }
    }
} 