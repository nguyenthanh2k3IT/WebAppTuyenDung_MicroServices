import React from 'react';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import Image from '@/components/image';
import { DataTable } from '@/components/table/data-table';

const columns: ColumnDef<OrderItem>[] = [
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
];

const DetailOrderModal: React.FC = () => {
    const { tableRef } = useTableRef();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.DetailOrder];

    if (!modalState || !modalState.visible) return null;

    return (
        <DrawerContainer
            title="Detail order"
            open={modalState.visible}
            onClose={() => closeModal(ModalType.DetailOrder)}
        >
            <div className={'px-2 md:w-[1200px] sm:w-full'}>
                <DataTable
                    columns={columns}
                    api={`/ordering-service/api/OrderItem/pagination/${modalState.data}`}
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/ordering-service/OrderItem"
                />
            </div>
        </DrawerContainer>
    );
};

export default DetailOrderModal;
