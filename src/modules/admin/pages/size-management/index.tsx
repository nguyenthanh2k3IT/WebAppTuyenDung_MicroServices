import AddButton from '@/components/button/add.button';
import EditButton from '@/components/button/edit.button';
import ColumnSelect from '@/components/table/column-select';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import SizeBreadcrumb from './components/size.breadcrumb';
import { DataTable } from '@/components/table/data-table';
import UpdateSizeModal from './components/update-size.modal';
import AddSizeModal from './components/add-size.modal';

function SizeManagement() {
    const { tableRef, onFetch } = useTableRef();
    const { openModal } = useModalContext();

    const columns = useMemo<ColumnDef<Size>[]>(
        () => [
            ColumnSelect<Size>(),
            {
                accessorKey: 'slug',
                header: 'SLUG',
            },
            {
                accessorKey: 'name',
                header: 'NAME',
            },
            {
                accessorKey: 'description',
                header: 'DESCRIPTION',
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => openModal(ModalType.UpdateSize, row.original, onFetch)}
                            />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
        <div className="h-fit">
            <UpdateSizeModal />
            <AddSizeModal />
            <div className="flex justify-between items-center">
                <SizeBreadcrumb />
                <AddButton
                    hoverContent="Create a new size"
                    onClick={() => openModal(ModalType.CreateSize, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/Size/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/catalog-service/api/Size"
                />
            </div>
        </div>
    );
}

export default SizeManagement;
