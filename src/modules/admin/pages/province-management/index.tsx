import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import CustomButton from '@/components/button/custom.button';
import ProvinceManagementBreadcrumb from './components/breadcrumb';
import CreateProvinceModal from './components/modals/create-province.modal';
import UpdateProvinceModal from './components/modals/update-province.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function ProvinceManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteProvince']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteProvince', { id });
    }, []);

    const columns = useMemo<ColumnDef<Province>[]>(() => [
        ColumnSelect<Province>(),
        {
            accessorKey: 'code',
            header: 'Mã tỉnh thành',
        },
        {
            accessorKey: 'name',
            header: 'Tên tỉnh thành',
        },
        {
            accessorKey: 'area',
            header: 'Mã khu vực',
        },
        {
            accessorKey: 'areaName',
            header: 'Tên khu vực',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateProvince, row.original, onFetch)}
                            className="py-1 px-2"
                        />                   
                    </div>
                );
            },
        },
    ], []);

    // const filterComponent = useCallback(() => {
    //     const handleFilterChange = useCallback((key: 'name', value: string) => {
    //         setFilter((prevFilter) => ({
    //             ...prevFilter,
    //             [key]: value,
    //         }));
    //     }, []);

    //     return (
    //         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
    //             <Input
    //                 placeholder="Filter by name"
    //                 value={filter.name}
    //                 onChange={(e) => handleFilterChange('name', e.target.value)}
    //                 className="w-full sm:w-[180px] filter-input"
    //             />
    //         </div>
    //     );
    // }, [filter]);

    const tableParams = useMemo(() => ({
        OrderCol: 'CreatedDate',
        OrderDir: 'desc',
        ...filter,
    }), [filter]);

    const handleDeleteProvince = useCallback(async () => {
        if (!dialogs.deleteProvince.data) {
            toast({
                title: 'Failed',
                description: 'Xóa tỉnh thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteProvince.data.id],
        };
        const result = await callApi('/identity-service/api/Province', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deleteProvince.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteProvince.visible}
                closeModal={() => closeDialog('deleteProvince')}
                onSubmit={handleDeleteProvince}
            />
            <CreateProvinceModal />
            <UpdateProvinceModal />
            <div className="flex justify-between items-center">
                <ProvinceManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới tỉnh thành"
                    onClick={() => openModal(ModalType.CreateProvince, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    // filter={filterComponent()}
                    api="/identity-service/api/Province/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/identity-service/api/Province"
                />
            </div>
        </div>
    );
}

export default memo(ProvinceManagement);