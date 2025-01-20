import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from '@/utils/axios';
import { Post } from '@/types/identity/post';
import { Breadcrumb } from '@/components/breadcrumb';

function PostPreview() {
    const [searchParams] = useSearchParams();
    const [post, setPost] = useState<Post | null>(null);
    const postId = searchParams.get('id');

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                try {
                    const res = await API.get(`/blog-service/api/Post/${postId}`);
                    setPost(res.data.data);
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            }
        };
        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const breadcrumbItems: BreadcrumbItem[] = [
        { title: 'Bài viết', link: '/admin/post' },
        { title: 'Nội dung', link: '#' },
    ];

    return (
        <div className="p-4">
            <div className="mb-4">
                <Breadcrumb values={breadcrumbItems} />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <span className="text-sm text-gray-500">{new Date(post.createdDate).toLocaleDateString()}</span>
            </div>
            <div className="mb-2">
                <strong>Thể loại:</strong> {post.category.name}
            </div>
            <div className="mb-2">
                <strong>Trạng thái:</strong> {post.status.name}
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
                {post.tagNames.map(tag => (
                    <span key={tag.id} className="px-2 py-1 bg-gray-200 rounded-sm">{tag.name}</span>
                ))}
            </div>
            <hr className="my-4" />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}

export default PostPreview;