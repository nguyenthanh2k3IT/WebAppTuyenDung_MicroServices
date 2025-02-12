import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import CustomButton from '@/components/button/custom.button';
import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import CreateJobCategoryModal from './component/modals/create-category.modal';
import UpdateJobCategoryModal from './component/modals/update-category.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';
import JobCategoryManagementBreadcrumb from './component/breadcrumb';

function JobCategoryManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteJobCategory']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteJobCategory', { id });
    }, []);

    const columns = useMemo<ColumnDef<JobCategory>[]>(() => [
        ColumnSelect<JobCategory>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên lĩnh vực',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateJobCategory, row.original, onFetch)}
                            className="py-1 px-2"
                        />                       
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

    const handleDeleteJobCategory = useCallback(async () => {
        if (!dialogs.deleteJobCategory.data) {
            toast({
                title: 'Failed',
                description: 'Xóa lĩnh vực thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteJobCategory.data.id],
        };
        const result = await callApi('/job-service/api/Category', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        closeDialog('deleteJobCategory'); // Ensure dialog is closed after successful deletion
    }
}, [dialogs.deleteJobCategory.data, callApi, onFetch, toast, closeDialog]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteJobCategory.visible}
                closeModal={() => closeDialog('deleteJobCategory')}
                onSubmit={handleDeleteJobCategory}
            />
            <CreateJobCategoryModal />
            <UpdateJobCategoryModal />
            <div className="flex justify-between items-center">
                <JobCategoryManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới lĩnh vực"
                    onClick={() => openModal(ModalType.CreateJobCategory, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/job-service/api/Category/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/job-service/api/Category"
                />
            </div>
        </div>
    );
}

export default memo(JobCategoryManagement);