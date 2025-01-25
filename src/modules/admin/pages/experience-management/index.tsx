import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import CustomButton from '@/components/button/custom.button';
import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import ExperienceManagementBreadcrumb from './components/breadcrumb';
import CreateExperienceModal from './components/modals/create-experience.modal';
import UpdateExperienceModal from './components/modals/update-experience.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function ExperienceManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteExperience']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteExperience', { id });
    }, []);

    const columns = useMemo<ColumnDef<Experience>[]>(() => [
        ColumnSelect<Experience>(),
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'name',
            header: 'Tên kinh nghiệm',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateExperience, row.original, onFetch)}
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

    const handleDeleteExperience = useCallback(async () => {
        if (!dialogs.deleteExperience.data) {
            toast({
                title: 'Failed',
                description: 'Xóa kinh nghiệm thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteExperience.data.id],
        };
        const result = await callApi('/job-service/api/Experience', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        closeDialog('deleteExperience'); // Ensure dialog is closed after successful deletion
    }
}, [dialogs.deleteExperience.data, callApi, onFetch, toast, closeDialog]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteExperience.visible}
                closeModal={() => closeDialog('deleteExperience')}
                onSubmit={handleDeleteExperience}
            />
            <CreateExperienceModal />
            <UpdateExperienceModal />
            <div className="flex justify-between items-center">
                <ExperienceManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới kinh nghiệm"
                    onClick={() => openModal(ModalType.CreateExperience, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/job-service/api/Experience/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/job-service/api/Experience"
                />
            </div>
        </div>
    );
}

export default memo(ExperienceManagement);