import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Select from 'react-select';

interface Category {
    id: string;
    name: string;
}

interface TagName {
    id: string;
    name: string;
}

function PostCreate() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [post, setPost] = useState({
        title: '',
        slug: '',
        content: '',
        image: '',
        categoryId: '',
        statusId: 0,
        tagNames: [] as string[],
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [tagNames, setTagNames] = useState<TagName[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get('/blog-service/api/Categories');
                setCategories(res.data.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        const fetchTagNames = async () => {
            try {
                const res = await API.get('/blog-service/api/Tagnames');
                setTagNames(res.data.data);
            } catch (error) {
                console.error('Failed to fetch tag names:', error);
            }
        };

        fetchCategories();
        fetchTagNames();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (selectedOption: any) => {
        setPost((prev) => ({ ...prev, categoryId: selectedOption.value }));
    };

    const handleTagNamesChange = (selectedOptions: any) => {
        const selectedTagIds = selectedOptions.map((option: any) => option.value);
        setPost((prev) => ({ ...prev, tagNames: selectedTagIds }));
    };

    const handleSubmit = async () => {
        try {
            const res = await API.post('/blog-service/api/Post', post);
            if (res.data.succeeded) {
                toast({ title: 'Success', description: 'Bài viết đã được tạo thành công', variant: 'success' });
                navigate('/admin/post');
            } else {
                toast({ title: 'Error', description: res.data.errorMessage, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to create post', variant: 'destructive' });
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tạo bài viết</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                <Input name="title" value={post.title} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Slug</label>
                <Input name="slug" value={post.slug} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nội dung</label>
                <Textarea name="content" value={post.content} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Ảnh bìa</label>
                <Input name="image" value={post.image} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Thể loại</label>
                <Select
                    options={categories.map(category => ({ value: category.id, label: category.name }))}
                    onChange={handleCategoryChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Thẻ</label>
                <Select
                    isMulti
                    options={tagNames.map(tag => ({ value: tag.id, label: tag.name }))}
                    onChange={handleTagNamesChange}
                />
            </div>
            <div className="flex justify-center">
                <Button onClick={handleSubmit}>Tạo bài viết</Button>
            </div>
        </div>
    );
}

export default PostCreate;