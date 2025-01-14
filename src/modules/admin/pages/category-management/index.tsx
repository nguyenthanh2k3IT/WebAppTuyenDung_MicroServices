import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import CustomButton from '@/components/button/custom.button';
import CategoryManagementBreadcrumb from './components/breadcrumb';
import CreateCategoryModal from './components/modals/create-category.modal';
import UpdateCategoryModal from './components/modals/update-category.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function CategoryManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteCategory']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteCategory', { id });
    }, []);

    const columns = useMemo<ColumnDef<Category>[]>(() => [
        ColumnSelect<Category>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên loại',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateCategory, row.original, onFetch)}
                            className="py-1 px-2"
                        />
                        <CustomButton
                            onClick={() => handleOpenDialog(row.original.id)}
                            className="py-1 px-2 bg-red-500 text-white hover:bg-red-600"
                            hoverContent={`Delete category`}
                        >
                            Xóa
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

    const handleDeleteCategory = useCallback(async () => {
        if (!dialogs.deleteCategory.data) {
            toast({
                title: 'Failed',
                description: 'Xóa loại thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteCategory.data.id],
        };
        const result = await callApi('/blog-service/api/Categories', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deleteCategory.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteCategory.visible}
                closeModal={() => closeDialog('deleteCategory')}
                onSubmit={handleDeleteCategory}
            />
            <CreateCategoryModal />
            <UpdateCategoryModal />
            <div className="flex justify-between items-center">
                <CategoryManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới loại"
                    onClick={() => openModal(ModalType.CreateCategory, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/blog-service/api/Categories/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/identity-service/api/Categories"
                />
            </div>
        </div>
    );
}

export default memo(CategoryManagement);