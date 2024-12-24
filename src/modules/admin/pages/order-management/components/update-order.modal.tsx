import DrawerContainer from '@/components/container/drawer.container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import { ModalType } from '@/enums/modal.enum';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import useProfile from '@/hooks/useProfile';
import { useEffect } from 'react';

interface OrderUpdate {
    id: string;
    receiverName: string;
    email: string;
    phone: string;
    address: string;
    modifiedUser: string;
}

const initialState: OrderUpdate = {
    id: '',
    receiverName: '',
    email: '',
    phone: '',
    address: '',
    modifiedUser: '',
};

function UpdateOrderModal() {
    const { profile } = useProfile();
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const { toast } = useToast();
    const [updateOrderInfo, , setInfo, handleObjectChange] = useObjectState<OrderUpdate>(initialState);

    const modalState = modals[ModalType.UpdateOrder];

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            setInfo({
                id: modalState.data.id || '',
                receiverName: modalState.data.receiverName || '',
                email: modalState.data.email || '',
                phone: modalState.data.phone || '',
                address: modalState.data.address || '',
                modifiedUser: profile?.id || '',
            });
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const showErrToast = (msg: string) => {
        toast({
            variant: 'destructive',
            title: 'Action alert',
            description: msg,
            duration: 1500,
        });
    };

    const handleUpdateOrder = async () => {
        if (updateOrderInfo.receiverName === '') {
            showErrToast('Receiver name is required');
            return;
        }
        if (updateOrderInfo.phone === '') {
            showErrToast('Phone is required');
            return;
        }
        if (updateOrderInfo.address === '') {
            showErrToast('Address is required');
            return;
        }
        if (updateOrderInfo.email === '') {
            showErrToast('Email is required');
            return;
        }
        const result = await callApi(
            `/ordering-service/api/Order`,
            {
                method: 'PUT',
                body: updateOrderInfo,
            },
            'Order updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.UpdateOrder);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    return (
        <div>
            <DrawerContainer
                title="Update Order"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.UpdateOrder)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="receiverName">Receiver name</Label>
                        <Input
                            id="receiverName"
                            value={updateOrderInfo.receiverName}
                            onChange={handleObjectChange}
                            placeholder="Enter receiver name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={updateOrderInfo.email}
                            onChange={handleObjectChange}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={updateOrderInfo.phone}
                            onChange={handleObjectChange}
                            placeholder="Enter phone"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={updateOrderInfo.address}
                            onChange={handleObjectChange}
                            placeholder="Enter address"
                        />
                    </div>
                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateOrder}
                        isLoading={loading}
                        loadingText="Updating Order..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default UpdateOrderModal;
