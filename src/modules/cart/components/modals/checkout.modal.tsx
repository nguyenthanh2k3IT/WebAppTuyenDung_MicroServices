import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import useProfile from '@/hooks/useProfile';
import PaymentService from '../../services/payment.service';
import { useToast } from '@/components/ui/use-toast';
import LoadingButton from '@/components/ui/loading-button';

export interface CheckoutInfo {
    receiverName: string;
    phone: string;
    address: string;
}

const CheckoutModal: React.FC = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const { profile } = useProfile();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.Checkout];

    const [checkoutInfo, setCheckoutInfo] = useObjectState<CheckoutInfo>({
        receiverName: profile?.fullname || '',
        phone: profile?.phone || '',
        address: profile?.address || '',
    });

    if (!modalState || !modalState.visible) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCheckoutInfo(id as keyof CheckoutInfo, value);
    };

    const handleCheckout = async () => {
        if (checkoutInfo.receiverName === '') {
            showErrToast('Receiver name is required');
            return;
        }
        if (checkoutInfo.phone === '') {
            showErrToast('Phone is required');
            return;
        }
        if (checkoutInfo.address === '') {
            showErrToast('Address is required');
            return;
        }
        setLoading(true);
        const result = await PaymentService.checkout(
            profile!.email,
            checkoutInfo.receiverName,
            checkoutInfo.phone,
            checkoutInfo.address,
        );
        setLoading(false);
        if (!result.succeeded) {
            showErrToast(result.errorMessage);
            return;
        }
        closeModal(ModalType.Checkout);
    };

    const showErrToast = (msg: string) => {
        toast({
            variant: 'destructive',
            title: 'Action alert',
            description: msg,
            duration: 1500,
        });
    };

    return (
        <DrawerContainer
            title="Checkout information"
            open={modalState.visible}
            onClose={() => closeModal(ModalType.Checkout)}
        >
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="receiverName">Receiver Name</Label>
                    <Input
                        id="receiverName"
                        value={checkoutInfo.receiverName}
                        onChange={handleInputChange}
                        placeholder="Enter receiver's full name"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={checkoutInfo.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={checkoutInfo.address}
                        onChange={handleInputChange}
                        placeholder="Enter delivery address"
                    />
                </div>
                <LoadingButton onClick={handleCheckout} isLoading={loading} loadingText="CHECKING OUT ...">
                    CHECK OUT
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CheckoutModal;
