import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import CustomButton from '@/components/button/custom.button';
import TagnameManagementBreadcrumb from './components/breadcrumb';
import CreateTagnameModal from './components/modals/create-tagname.modal';
import UpdateTagnameModal from './components/modals/update-tagname.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function TagnameManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteTagname']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteTagname', { id });
    }, []);

    const columns = useMemo<ColumnDef<Tagname>[]>(() => [
        ColumnSelect<Tagname>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên thẻ',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateTagname, row.original, onFetch)}
                            className="py-1 px-2"
                        />
                        <CustomButton
                            onClick={() => handleOpenDialog(row.original.id)}
                            className="py-1 px-2 bg-red-500 text-white hover:bg-red-600"
                            hoverContent={`Delete tagname`}
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

    const handleDeleteTagname = useCallback(async () => {
        if (!dialogs.deleteTagname.data) {
            toast({
                title: 'Failed',
                description: 'Xóa thẻ thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteTagname.data.id],
        };
        const result = await callApi('/blog-service/api/Tagnames', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deleteTagname.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteTagname.visible}
                closeModal={() => closeDialog('deleteTagname')}
                onSubmit={handleDeleteTagname}
            />
            <CreateTagnameModal />
            <UpdateTagnameModal />
            <div className="flex justify-between items-center">
                <TagnameManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới thẻ"
                    onClick={() => openModal(ModalType.CreateTagname, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/blog-service/api/Tagnames/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/blog-service/api/Tagnames"
                />
            </div>
        </div>
    );
}

export default memo(TagnameManagement);