import { Eye, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import MyOrderSkeleton from '../components/skeletons/my-order.skeleton';
import ExpandableList from '@/components/list/expandable.list';
import useExpandableListRef from '@/hooks/useExpandableListRef';
import { orderColors } from '@/modules/admin/pages/order-management/constants/order.color';
import Currency from '@/components/label/currency.label';
import dayjs from 'dayjs';
import { Cross1Icon } from '@radix-ui/react-icons';
import useDialog from '@/hooks/useDialog';
import ConfirmDialog from '@/components/dialog/confirm.dialog';
import useCaller from '@/hooks/useCaller';
import { OrderStatusEnum } from '@/enums/order-status.enum';

const dialogKey = 'cancel';

function MyOrderPage() {
    const { callApi } = useCaller();
    const { dialogs, openDialog, closeDialog } = useDialog([dialogKey]);
    const { listRef, handleModify } = useExpandableListRef();
    const { openModal } = useModalContext();

    const showOrderDetail = (order: Order) => {
        openModal(ModalType.DetailOrder, order.id);
    };

    const showOrderHistory = (order: Order) => {
        openModal(ModalType.OrderHistory, order.id);
    };

    const handleCancelOrder = async () => {
        const id = dialogs[dialogKey].data;
        const result = await callApi(
            `/ordering-service/api/Order/${id}/cancel`,
            {
                method: 'DELETE',
            },
            'Cancel order successfully',
        );
        if (result.succeeded) {
            handleModify(id, result.data);
        }
    };

    const orderComponent = (order: Order) => {
        return (
            <Card key={order.id} className="mb-4">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <p className="font-semibold">Order ID: {order.id}</p>
                            <p>
                                Total: {order.total}
                                <Currency type="euro" />
                            </p>
                            <p>
                                Discount: {order.discountPrice}
                                <Currency type="euro" />
                            </p>
                            <p>Points used: {order.pointUsed}</p>
                            <p>Order date: {dayjs(order.createdDate).format('DD/MM/YYYY')}</p>
                            <p>Last updated: 09/12/2024</p>
                        </div>
                        <Badge className={`${orderColors[order.statusId || 'None']} text-white`}>
                            {order.statusId}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                    {(order.statusId === OrderStatusEnum.Packed || order.statusId === OrderStatusEnum.Placed) && (
                        <Button variant="destructive" size="sm" onClick={() => openDialog(dialogKey, order.id)}>
                            <Cross1Icon className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => showOrderDetail(order)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => showOrderHistory(order)}>
                        <History className="mr-2 h-4 w-4" />
                        Order history
                    </Button>
                </CardFooter>
            </Card>
        );
    };

    const skeletonComponent = () => {
        return <MyOrderSkeleton />;
    };

    return (
        <div className="container mx-auto p-4">
            <ConfirmDialog
                variant="destructive"
                title="Confirm cancel order"
                description="Are you sure cancel this order?"
                closeModal={() => closeDialog(dialogKey)}
                visible={dialogs[dialogKey].visible}
                onSubmit={handleCancelOrder}
            />
            <h1 className="text-2xl font-bold mb-6">Order History</h1>
            <ExpandableList
                ref={listRef}
                api="/ordering-service/api/Order/filter/user"
                content={orderComponent}
                skeleton={skeletonComponent()}
                totalRecord={4}
            />
        </div>
    );
}

export default MyOrderPage;
