import NotFound from '@/components/error/not-found';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import ColumnSelect from '@/components/table/column-select';
import EditButton from '@/components/button/edit.button';
import { ModalType } from '@/enums/modal.enum';
import { DataTable } from '@/components/table/data-table';
import AddButton from '@/components/button/add.button';
import ProductItemBreadcrumb from './components/product-item.breadcrumb';
import { ImageIcon } from '@radix-ui/react-icons';
import Currency from '@/components/label/currency.label';
import ProductImageModal from './components/product-image.modal';
import UpdateProductItemModal from './components/product-item-edit.modal';
import DetailButton from '@/components/button/detail.button';
import AddProductItemModal from './components/product-item-add.modal';

function ProductItemManagement() {
    const { id } = useParams();
    const { openModal } = useModalContext();
    const { tableRef, onFetch } = useTableRef();
    const navigate = useNavigate();

    if (!id) {
        return <NotFound to={AdminNavigate.product.link} />;
    }

    const columns = useMemo<ColumnDef<ProductItem>[]>(
        () => [
            ColumnSelect<ProductItem>(),
            {
                accessorKey: 'additionalPrice',
                header: 'ADDITIONAL PRICE',
                cell: ({ row }) => {
                    const additionalPrice = row.original.additionalPrice;
                    return (
                        <span>
                            {additionalPrice} <Currency type="euro" className="font-semibold" />
                        </span>
                    );
                },
            },
            {
                accessorKey: 'color.name',
                header: 'COLOR',
            },
            {
                accessorKey: 'images',
                header: 'IMAGES',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <ImageIcon
                                className="w-6 h-6 cursor-pointer hover:opacity-75 transition"
                                onClick={() => openModal(ModalType.ProductImage, row.original, onFetch)}
                            />
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => openModal(ModalType.UpdateProductItem, row.original, onFetch)}
                            />
                            <DetailButton
                                className="py-1 px-2"
                                onClick={() => navigate(`/admin/variation/${row.original.id}`)}
                            />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const param = useMemo(() => ({ ProductId: id }), [id]);

    return (
        <div className="h-fit">
            <ProductImageModal />
            <UpdateProductItemModal />
            <AddProductItemModal />
            <div className="flex justify-between items-center">
                <ProductItemBreadcrumb id={id} />
                <AddButton
                    hoverContent="Create a new size"
                    onClick={() => openModal(ModalType.CreateProductItem, id, onFetch)}
                >
                    Create
                </AddButton>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/catalog-service/api/ProductItem/pagination"
                    param={param}
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/catalog-service/api/ProductItem"
                />
            </div>
        </div>
    );
}

export default ProductItemManagement;
