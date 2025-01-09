import { memo, useMemo, useState, useCallback } from 'react';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import EditButton from '@/components/button/edit.button';
import AddButton from '@/components/button/add.button';
import CustomButton from '@/components/button/custom.button';
import CompanyManagementBreadcrumb from './components/breadcrumb';
import CreateCompanyModal from './components/modals/create-company.modal';
import UpdateCompanyModal from './components/modals/update-company.modal';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useDialog from '@/hooks/useDialog';
import useCaller from '@/hooks/useCaller';
import { useToast } from '@/components/ui/use-toast';

function CompanyManagement() {
    const { toast } = useToast();
    const { callApi } = useCaller<any>();
    const { openModal } = useModalContext();
    const { dialogs, openDialog, closeDialog } = useDialog(['deleteCompany']);
    const { tableRef, onFetch } = useTableRef();
    const [filter, setFilter] = useState({
        name: '',
    });

    const handleOpenDialog = useCallback((id: string) => {
        openDialog('deleteCompany', { id });
    }, []);

    const columns = useMemo<ColumnDef<Company>[]>(() => [
        ColumnSelect<Company>(),
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Số điện thoại',
        },
        {
            accessorKey: 'fullname',
            header: 'Tên doanh nghiệp',
        },
        {
            accessorKey: 'website',
            header: 'Website',
        },
        {
            accessorKey: 'address',
            header: 'Địa chỉ',
        },
        {
            id: 'actions',
            header: 'Hành động',
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <EditButton
                            onClick={() => openModal(ModalType.UpdateCompany, row.original, onFetch)}
                            className="py-1 px-2"
                        />
                        <CustomButton
                            onClick={() => handleOpenDialog(row.original.id)}
                            className="py-1 px-2 bg-red-500 text-white hover:bg-red-600"
                            hoverContent={`Delete company`}
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

    const handleDeleteCompany = useCallback(async () => {
        if (!dialogs.deleteCompany.data) {
            toast({
                title: 'Failed',
                description: 'Xóa công ty thất bại',
                variant: 'destructive',
            });
            return;
        }
        const payload = {
            ids: [dialogs.deleteCompany.data.id],
        };
        const result = await callApi('/identity-service/api/Company', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (result.succeeded) {
            onFetch();
        }
    }, [dialogs.deleteCompany.data]);

    return (
        <div className="h-fit">
            <ConfirmDialog
                visible={dialogs.deleteCompany.visible}
                closeModal={() => closeDialog('deleteCompany')}
                onSubmit={handleDeleteCompany}
            />
            <CreateCompanyModal />
            <UpdateCompanyModal />
            <div className="flex justify-between items-center">
                <CompanyManagementBreadcrumb />
                <AddButton
                    hoverContent="Tạo mới công ty"
                    onClick={() => openModal(ModalType.CreateCompany, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    param={tableParams}
                    api="/identity-service/api/Company/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/api/Company"
                />
            </div>
        </div>
    );
}

export default memo(CompanyManagement);