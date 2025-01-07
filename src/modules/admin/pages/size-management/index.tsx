import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import CustomButton from '@/components/button/custom.button';
import SizeManagementBreadcrumb from './components/breadcrumb';
import CreateSizeModal from './components/modals/create-size.modal';
import UpdateSizeModal from './components/modals/update-size.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function SizeManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteSize']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteSize', { id });
    }, []);

    const columns = useMemo<ColumnDef<Size>[]>(() => [
        ColumnSelect<Size>(),
        {
            accessorKey: 'name',
            header: 'Tên quy mô',
        },
        {
            accessorKey: 'value',
            header: 'Giới hạn quy mô',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateSize, row.original, onFetch)}
                            className="py-1 px-2"
                        />
                        <CustomButton
                            onClick={() => handleOpenDialog(row.original.id)}
                            className="py-1 px-2 bg-red-500 text-white hover:bg-red-600"
                            hoverContent={`Delete size`}
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

    const handleDeleteSize = useCallback(async () => {
        if (!dialogs.deleteSize.data) {
            toast({
                title: 'Failed',
                description: 'Xóa quy mô thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteSize.data.id],
        };
        const result = await callApi('/api/Size', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deleteSize.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteSize.visible}
                closeModal={() => closeDialog('deleteSize')}
                onSubmit={handleDeleteSize}
            />
            <CreateSizeModal />
            <UpdateSizeModal />
            <div className="flex justify-between items-center">
                <SizeManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới quy mô"
                    onClick={() => openModal(ModalType.CreateSize, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/api/Size/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/api/Size"
                />
            </div>
        </div>
    );
}

export default memo(SizeManagement);