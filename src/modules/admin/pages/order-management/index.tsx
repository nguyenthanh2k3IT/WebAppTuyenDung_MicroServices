import EditButton from '@/components/button/edit.button';
import ColumnSelect from '@/components/table/column-select';
import { DataTable } from '@/components/table/data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModalType } from '@/enums/modal.enum';
import useFetch from '@/hooks/useFetch';
import useModalContext from '@/hooks/useModal';
import useTableRef from '@/hooks/useTableRef';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import OrderStatusButton from './components/order-status.button';
import { orderColors } from './constants/order.color';
import { cn } from '@/lib/utils';
import OrderBreadcrumb from './components/order.breadcrumb';
import useDialog from '@/hooks/useDialog';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import { orderHover } from './constants/order.hover';
import UpdateOrderModal from './components/update-order.modal';
import DetailButton from '@/components/button/detail.button';
import { useNavigate } from 'react-router-dom';
import useCaller from '@/hooks/useCaller';
import { OrderStatusEnum } from '@/enums/order-status.enum';

const dialogKey = 'update';
const initDescription = 'Are you sure you want to perform this action?';
const initTitle = 'Confirm dialog';

function OrderManagement() {
    const navigate = useNavigate();
    const { callApi } = useCaller<any>();
    const { dialogs, openDialog, closeDialog } = useDialog([dialogKey]);
    const { tableRef, onFetch } = useTableRef();
    const { openModal } = useModalContext();
    const [description, setDescription] = useState<string>(initDescription);
    const [title, setTitle] = useState<string>(initTitle);
    const [filter, setFilter] = useState({
        Status: '',
    });

    const handleOpenDialog = (order: Order) => {
        if (!order.statusId) return;
        const action = orderHover[order.statusId].toUpperCase();
        setDescription(`Are you sure you want to ${action} this order?`);
        setTitle(`Confirm ${action} order`);
        openDialog(dialogKey, order);
    };

    const handleChangeStatus = async () => {
        let status: string = dialogs[dialogKey].data.statusId;
        if (status === OrderStatusEnum.Placed) {
            status = OrderStatusEnum.Packed;
        } else if (status === OrderStatusEnum.Packed) {
            status = OrderStatusEnum.Shipping;
        } else if (status === OrderStatusEnum.Shipping) {
            status = OrderStatusEnum.Completed;
        } else {
            return;
        }
        const result = await callApi(
            `/ordering-service/api/Order/status`,
            {
                method: 'PUT',
                body: {
                    id: dialogs[dialogKey].data.id,
                    status,
                },
            },
            'Order updated successfully',
        );
        if (result.succeeded) {
            onFetch();
        }
    };

    const columns = useMemo<ColumnDef<Order>[]>(
        () => [
            ColumnSelect<Order>(),
            {
                accessorKey: 'basePrice',
                header: 'BASE PRICE',
            },
            {
                accessorKey: 'subPrice',
                header: 'SUB PRICE',
            },
            {
                accessorKey: 'discountPrice',
                header: 'DISCOUNT',
            },
            {
                accessorKey: 'pointUsed',
                header: 'POINT',
            },
            {
                accessorKey: 'total',
                header: 'TOTAL',
            },
            {
                accessorKey: 'status.name',
                header: 'STATUS',
                cell: ({ row }) => {
                    if (!row.original.statusId) return null;
                    const statusClass = orderColors[row.original.statusId] || 'bg-gray-200 hover:bg-gray-300';
                    return (
                        <div className={cn(statusClass, 'px-2 font-semibold py-1 tracking-wider uppercase text-white')}>
                            {row.original.status?.name}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'receiverName',
                header: 'NAME',
            },
            {
                accessorKey: 'phone',
                header: 'PHONE',
            },
            {
                accessorKey: 'address',
                header: 'ADDRESS',
            },
            {
                id: 'actions',
                header: 'ACTION',
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <EditButton
                                className="py-1 px-2"
                                onClick={() => openModal(ModalType.UpdateOrder, row.original, onFetch)}
                            />
                            <OrderStatusButton
                                onClick={() => handleOpenDialog(row.original)}
                                status={row.original.status}
                                className="py-1 px-2"
                            />
                            <DetailButton
                                className="py-1 px-2"
                                hoverContent="View order item"
                                onClick={() => navigate(`/admin/order/${row.original.id}`)}
                            />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const filterComponent = useCallback(() => {
        const endpoint = useMemo(() => '/ordering-service/api/OrderStatus/get-all', []);
        const { data } = useFetch<OrderStatus[]>(endpoint, null, [endpoint]);

        const handleFilterChange = useCallback((value: string) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                ['Status']: value === 'ALL' ? '' : value,
            }));
        }, []);

        return (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Select onValueChange={(value) => handleFilterChange(value)} value={filter.Status}>
                    <SelectTrigger className="w-full sm:w-[180px] filter-input">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        {data?.map((value, index) => {
                            return (
                                <SelectItem value={value.id} key={index}>
                                    {value.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
        );
    }, [filter]);

    const tableParams = useMemo(
        () => ({
            Status: filter.Status,
        }),
        [filter],
    );

    return (
        <div className="h-fit">
            <UpdateOrderModal />
            <ConfirmDialog
                title={title}
                description={description}
                closeModal={() => closeDialog(dialogKey)}
                onSubmit={handleChangeStatus}
                visible={dialogs[dialogKey].visible}
                variant="default"
            />
            <div className="flex justify-between items-center">
                <OrderBreadcrumb />
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    api="/ordering-service/api/Order/pagination"
                    param={tableParams}
                    filter={filterComponent()}
                    ref={tableRef}
                    selectKey={'id'}
                    deleteApi="/ordering-service/Order"
                />
            </div>
        </div>
    );
}

export default OrderManagement;
