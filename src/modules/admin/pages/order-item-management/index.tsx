import NotFound from '@/components/error/not-found';
import ValidatorHelper from '@/helpers/validator.helper';
import useTableRef from '@/hooks/useTableRef';
import { useParams } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Image from '@/components/image';
import { DataTable } from '@/components/table/data-table';
import OrderItemBreadcrumb from './components/order-item.breadcrumb';

function OrderItemManagement() {
    const { id } = useParams();
    const { tableRef } = useTableRef();

    if (!id || !ValidatorHelper.isGuid(id)) {
        return <NotFound to={AdminNavigate.order.link} />;
    }

    const columns = useMemo<ColumnDef<OrderItem>[]>(
        () => [
            {
                accessorKey: 'image',
                header: 'IMAGE',
                cell: ({ row }) => {
                    return <Image src={row.original.image || ''} alt={'image'} shape="square" className="w-10 h-10" />;
                },
            },
            {
                accessorKey: 'name',
                header: 'NAME',
            },
            {
                accessorKey: 'brand',
                header: 'BRAND',
            },
            {
                accessorKey: 'category',
                header: 'CATEGORY',
            },
            {
                accessorKey: 'size',
                header: 'SIZE',
            },
            {
                accessorKey: 'color',
                header: 'COLOR',
            },
            {
                accessorKey: 'price',
                header: 'PRICE',
            },
            {
                accessorKey: 'stock',
                header: 'STOCK',
            },
            {
                accessorKey: 'quantity',
                header: 'QUANTITY',
            },
            {
                accessorKey: 'amount',
                header: 'AMOUNT',
            },
        ],
        [],
    );

    return (
        <div className="h-fit">
            <div className="flex justify-between items-center">
                <OrderItemBreadcrumb />
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api={`/ordering-service/api/OrderItem/pagination/${id}`}
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/ordering-service/OrderItem"
                />
            </div>
        </div>
    );
}

export default OrderItemManagement;
