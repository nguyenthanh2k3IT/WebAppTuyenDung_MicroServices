import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import CustomButton from '@/components/button/custom.button';
import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import CreateGenderModal from './component/modals/create-gender.modal';
import UpdateGenderModal from './component/modals/update-gender.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';
import GenderManagementBreadcrumb from './component/breadcrumb';

function GenderManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteGender']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteGender', { id });
    }, []);

    const columns = useMemo<ColumnDef<Gender>[]>(() => [
        ColumnSelect<Gender>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên giới tính',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateGender, row.original, onFetch)}
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

    const handleDeleteGender = useCallback(async () => {
        if (!dialogs.deleteGender.data) {
            toast({
                title: 'Failed',
                description: 'Xóa giới tính thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteGender.data.id],
        };
        const result = await callApi('/job-service/api/Gender', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        closeDialog('deleteGender'); // Ensure dialog is closed after successful deletion
    }
}, [dialogs.deleteGender.data, callApi, onFetch, toast, closeDialog]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteGender.visible}
                closeModal={() => closeDialog('deleteGender')}
                onSubmit={handleDeleteGender}
            />
            <CreateGenderModal />
            <UpdateGenderModal />
            <div className="flex justify-between items-center">
                <GenderManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới giới tính"
                    onClick={() => openModal(ModalType.CreateGender, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/job-service/api/Gender/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/job-service/api/Gender"
                />
            </div>
        </div>
    );
}

export default memo(GenderManagement);

