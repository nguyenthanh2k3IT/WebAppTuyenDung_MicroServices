import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { useParams } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import NotFound from '@/components/error/not-found';
import { useMemo } from 'react';
import EditButton from '@/components/button/edit.button';
import { ModalType } from '@/enums/modal.enum';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import AddButton from '@/components/button/add.button';
import { DataTable } from '@/components/table/data-table';
import VariationBreadcrumb from './components/variation.breadcrumb';
import UpdateVariationModal from './components/variation-edit.modal';
import AddVariationModal from './components/variation-add.modal';

function VariationManagement() {
    const { id } = useParams();
    const { openModal } = useModalContext();
    const { tableRef, onFetch } = useTableRef();

    if (!id) {
        return <NotFound to={AdminNavigate.product.link} />;
    }

    const columns = useMemo<ColumnDef<Variation>[]>(
        () => [
            ColumnSelect<Variation>(),
            {
                accessorKey: 'qtyDisplay',
                header: 'QUANTITY DISPLAY',
            },
            {
                accessorKey: 'qtyInStock',
                header: 'QUANTITY IN STOCK',
            },
            {
                accessorKey: 'size.name',
                header: 'SIZE',
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => openModal(ModalType.UpdateVariation, row.original, onFetch)}
                            />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const param = useMemo(() => ({ ProductItemId: id }), [id]);

    return (
        <div className="h-fit">
            <UpdateVariationModal />
            <AddVariationModal />
            <div className="flex justify-between items-center">
                <VariationBreadcrumb id={id} />
                <AddButton
                    hoverContent="Create a new size"
                    onClick={() => openModal(ModalType.CreateVariation, id, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/Variation/pagination"
                    param={param}
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/catalog-service/api/Variation"
                />
            </div>
        </div>
    );
}

export default VariationManagement;
