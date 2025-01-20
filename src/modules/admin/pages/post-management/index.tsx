import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import CustomButton from '@/components/button/custom.button';
import PostManagementBreadcrumb from './components/breadcrumb';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Post } from '@/types/identity/post';

function PostManagement() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { dialogs, openDialog, closeDialog } = useDialog(['deletePost']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        title: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deletePost', { id });
    }, []);

    const columns = useMemo<ColumnDef<Post>[]>(() => [
        ColumnSelect<Post>(),
        {
            accessorKey: 'image',
            header: 'Ảnh bìa',
            cell: ({ row }) => <img src={row.original.image} alt={row.original.title} className="w-16 h-16 object-cover" />,
        },
        {
            accessorKey: 'slug',
            header: 'Mã bài viết',
        },
        {
            accessorKey: 'title',
            header: 'Tiêu đề',
        },
        {
            accessorKey: 'category.name',
            header: 'Thể loại',
        },
        {
            accessorKey: 'status.name',
            header: 'Trạng thái',
        },
        {
            accessorKey: 'tagNames',
            header: 'Thẻ bài viết',
            cell: ({ row }) => row.original.tagNames.map(tag => tag.name).join(', '),
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => navigate(`/admin/post/update?id=${row.original.id}`)}
                            className="py-1 px-2"
                        />
                        <CustomButton
                            onClick={() => handleOpenDialog(row.original.id)}
                            className="py-1 px-2 bg-red-500 text-white hover:bg-red-600"
                            hoverContent={`Delete post`}
                        >
                            Xóa
                        </CustomButton>
                        <CustomButton
                            onClick={() => navigate(`/admin/post/preview?id=${row.original.id}`)}
                            className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-600"
                            hoverContent={`View post`}
                        >
                            Xem
                        </CustomButton>
                    </div>
                );
            },
        },
    ], []);

    const tableParams = useMemo(() => ({
        OrderCol: 'CreatedDate',
        OrderDir: 'desc',
        ...filter,
    }), [filter]);

    const handleDeletePost = useCallback(async () => {
        if (!dialogs.deletePost.data) {
            toast({
                title: 'Failed',
                description: 'Xóa bài viết thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deletePost.data.id],
        };
        const result = await callApi('/blog-service/api/Post', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deletePost.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deletePost.visible}
                closeModal={() => closeDialog('deletePost')}
                onSubmit={handleDeletePost}
            />
            <div className="flex justify-between items-center">
                <PostManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới bài viết"
                    onClick={() => navigate('/admin/post/create')}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/blog-service/api/Post/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/blog-service/api/Post"
                />
            </div>
        </div>
    );
}

export default memo(PostManagement);