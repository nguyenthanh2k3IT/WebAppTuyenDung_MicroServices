import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import CustomButton from '@/components/button/custom.button';
import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import CreateRankModal from './components/modals/create-rank.modal';
import UpdateRankModal from './components/modals/update-rank.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';
import RankManagementBreadcrumb from './components/breadcrumb';

function RankManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteRank']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteRank', { id });
    }, []);

    const columns = useMemo<ColumnDef<Rank>[]>(() => [
        ColumnSelect<Rank>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên cấp bậc',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateRank, row.original, onFetch)}
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

    const handleDeleteRank = useCallback(async () => {
        if (!dialogs.deleteRank.data) {
            toast({
                title: 'Failed',
                description: 'Xóa cấp bậc thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteRank.data.id],
        };
        const result = await callApi('/job-service/api/Rank', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        closeDialog('deleteRank'); // Ensure dialog is closed after successful deletion
    }
}, [dialogs.deleteRank.data, callApi, onFetch, toast, closeDialog]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteRank.visible}
                closeModal={() => closeDialog('deleteRank')}
                onSubmit={handleDeleteRank}
            />
            <CreateRankModal />
            <UpdateRankModal />
            <div className="flex justify-between items-center">
                <RankManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới cấp bậc"
                    onClick={() => openModal(ModalType.CreateRank, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/job-service/api/Rank/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/job-service/api/Rank"
                />
            </div>
        </div>
    );
}

export default memo(RankManagement);