import EditButton from '@/components/button/edit.button';
import ColumnSelect from '@/components/table/column-select';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import ColorBreadcrumb from './components/color.breadcrumb';
import AddButton from '@/components/button/add.button';
import { DataTable } from '@/components/table/data-table';
import UpdateColorModal from './components/update-color.modal';
import AddColorModal from './components/add-color.modal';

function ColorManagement() {
    const { tableRef, onFetch } = useTableRef();
    const { openModal } = useModalContext();

    const columns = useMemo<ColumnDef<Color>[]>(
        () => [
            ColumnSelect<Color>(),
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
                                onClick={() => openModal(ModalType.UpdateColor, row.original, onFetch)}
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
            <UpdateColorModal />
            <AddColorModal />
            <div className="flex justify-between items-center">
                <ColorBreadcrumb />
                <AddButton
                    hoverContent="Create a new color"
                    onClick={() => openModal(ModalType.CreateColor, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/Color/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/catalog-service/api/Color"
                />
            </div>
        </div>
    );
}

export default ColorManagement;
