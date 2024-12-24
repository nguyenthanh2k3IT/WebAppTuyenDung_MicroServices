import APIEndpoint from '@/utils/api.endpoint';
import { API } from '@/utils/axios';

export default class CommentService {
    static async getRecent(product: string, take: number): Promise<ProductComment[]> {
        try {
            const res = await API.get(APIEndpoint.commentFilter, {
                params: {
                    ProductId: product,
                    TotalRecord: take,
                    Skip: 0,
                },
            });
            const obj: ApiRes<ProductComment[]> = res.data;
            return obj.data ?? [];
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            return [];
        }
    }

    static async getAll(id: string): Promise<ProductComment[]> {
        try {
            const res = await API.get(APIEndpoint.commentProduct(id));
            const obj: ApiRes<ProductComment[]> = res.data;
            return obj.data ?? [];
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            return [];
        }
    }

    static async create(product: string, user: string, content: string): Promise<ProductComment | null> {
        try {
            const res = await API.post(APIEndpoint.commentRoot, {
                Content: content,
                UserId: user,
                ProductId: product,
            });
            const obj: ApiRes<ProductComment> = res.data;
            return obj.data;
        } catch (error) {
            console.error('Failed create comment:', error);
            return null;
        }
    }
}
