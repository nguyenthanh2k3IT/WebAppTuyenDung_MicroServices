import EditButton from '@/components/button/edit.button';
import Image from '@/components/image';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import UpdateBrandModal from './components/update-brand.modal';
import AddButton from '@/components/button/add.button';
import BrandBreadcrumb from './components/brand.breadcrumb';
import AddBrandModal from './components/add-brand.modal';

function BrandManagement() {
    const { tableRef, onFetch } = useTableRef();
    const { openModal } = useModalContext();

    const columns = useMemo<ColumnDef<Brand>[]>(
        () => [
            ColumnSelect<Brand>(),
            {
                accessorKey: 'slug',
                header: 'SLUG',
            },
            {
                accessorKey: 'image',
                header: 'IMAGE',
                cell: ({ row }) => {
                    return <Image src={row.original.image || ''} alt={'avatar'} shape="square" className="" />;
                },
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
                                onClick={() => openModal(ModalType.UpdateBrand, row.original, onFetch)}
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
            <UpdateBrandModal />
            <AddBrandModal />
            <div className="flex justify-between items-center">
                <BrandBreadcrumb />
                <AddButton
                    hoverContent="Create a new brand"
                    onClick={() => openModal(ModalType.CreateBrand, null, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/Brand/pagination"
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/catalog-service/api/Brand"
                />
            </div>
        </div>
    );
}

export default BrandManagement;
