import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import CustomButton from '@/components/button/custom.button';
import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import WorkTypeManagementBreadcrumb from './components/breadcrumb';
import CreateWorkTypeModal from './components/modals/create-worktype.modal';
import UpdateWorkTypeModal from './components/modals/update-worktype.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function WorkTypeManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteWorkType']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteWorkType', { id });
    }, []);

    const columns = useMemo<ColumnDef<Worktype>[]>(() => [
        ColumnSelect<Worktype>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên hình thức làm việc',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                                onClick={() => openModal(ModalType.UpdateWorkType, row.original, onFetch)}
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

    const handleDeleteWorkType = useCallback(async () => {
        if (!dialogs.deleteWorkType.data) {
            toast({
                title: 'Failed',
                description: 'Xóa hình thức làm việc thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteWorkType.data.id],
        };
        const result = await callApi('/job-service/api/WorkType', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deleteWorkType.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteWorkType.visible}
                closeModal={() => closeDialog('deleteWorkType')}
                onSubmit={handleDeleteWorkType}
            />
            <CreateWorkTypeModal />
            <UpdateWorkTypeModal />
            <div className="flex justify-between items-center">
                <WorkTypeManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới hình thức làm việc"
                    onClick={() => openModal(ModalType.CreateWorkType, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/job-service/api/WorkType/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/job-service/api/WorkType"
                />
            </div>
        </div>
    );
}

export default memo(WorkTypeManagement);