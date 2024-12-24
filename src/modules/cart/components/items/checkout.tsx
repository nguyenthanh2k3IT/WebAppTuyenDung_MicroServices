import { memo, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, X, XCircleIcon } from 'lucide-react';
import useModalContext from '@/hooks/useModal';
import { ModalType } from '@/enums/modal.enum';
import useCart from '@/hooks/useCart';
import DiscountService from '@/services/discount.service';
import useCaller from '@/hooks/useCaller';

function Checkout() {
    const { callApi } = useCaller<any>();
    const { state, applyDiscount, removeDiscount, applyPoint, removePoint } = useCart();
    const { openModal } = useModalContext();
    const [promoCode, setPromoCode] = useState(state.cart?.discount?.code || '');
    const [discountOption, setDiscountOption] = useState<SelectOption[]>([]);
    const [pointOption, setPointOption] = useState<SelectOption[]>([]);

    const handleCheckout = () => {
        openModal(ModalType.Checkout);
    };

    const handleApplyPromoCode = () => {
        if (promoCode && promoCode !== '') applyDiscount(promoCode);
    };

    const handleRemovePromoCode = () => {
        if (promoCode && promoCode !== '') removeDiscount(promoCode);
    };

    const handleSelectDiscount = (value: string) => {
        setPromoCode(value);
    };

    const handleSelectPoint = (value: string) => {
        if (value === '0') {
            removePoint();
        } else {
            applyPoint(value);
        }
    };

    useEffect(() => {
        if (state.cart && state.cart.items && state.cart.items.length > 0) {
            const getDiscount = async () => {
                const ids = state.cart?.items
                    .map((item) => {
                        return item.productId;
                    })
                    .join(',');
                if (ids) {
                    const res = await DiscountService.getByProduct(ids);
                    setDiscountOption(res);
                }
            };

            const getPoint = async () => {
                const result = await callApi(
                    '/identity-service/api/User/point/option',
                    {
                        method: 'GET',
                    },
                    '',
                    false,
                );
                if (result.succeeded && result.data) {
                    const data: SelectOption[] = result.data;
                    setPointOption(data.filter((x) => Number(x.value) <= state.cart!.total) || []);
                }
            };

            getDiscount();
            getPoint();
        }
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-2">
                <h2 className="text-xl font-bold">TOTAL</h2>
                <span>£{state.cart?.total}</span>
            </div>

            <Separator className="bg-gray-300 my-4" />

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="font-semibold">Sub-total</span>
                    <span>£{state.cart?.basePrice}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Delivery</span>
                    <span className="text-blue-600">£{state.cart?.subPrice}</span>
                </div>
                {state.cart?.discountPrice! > 0 && (
                    <div className="flex justify-between">
                        <span className="font-semibold">Discount</span>
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold">£{state.cart?.discountPrice}</span>
                            <XCircleIcon
                                onClick={handleRemovePromoCode}
                                className="text-red-500 hover:opacity-80 transition cursor-pointer"
                            />
                        </div>
                    </div>
                )}
                {state.cart?.pointUsed !== 0 && (
                    <div className="flex justify-between">
                        <span className="font-semibold">Point</span>
                        <span className="text-red-500">£{state.cart?.pointUsed}</span>
                    </div>
                )}
            </div>

            <Separator className="bg-gray-300 mb-2" />

            <div className="space-y-4 mb-4">
                <div>
                    <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Promo Code
                    </label>
                    <div className="flex space-x-2">
                        <div className="relative flex-grow">
                            <Input
                                id="promoCode"
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="pr-8 w-full"
                                placeholder="Enter promo code"
                            />
                            {promoCode && (
                                <button
                                    onClick={() => setPromoCode('')}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        {discountOption.length > 0 && (
                            <Select onValueChange={handleSelectDiscount}>
                                <SelectTrigger className="w-[40px] px-0">
                                    <ChevronDown className="h-4 w-4" />
                                </SelectTrigger>
                                <SelectContent>
                                    {discountOption.map((item, index) => (
                                        <SelectItem key={index} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        <Button onClick={handleApplyPromoCode}>Apply</Button>
                    </div>
                </div>
                <div>
                    <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                        Use Points
                    </label>
                    <Select value={state.cart?.pointUsed.toString()} onValueChange={handleSelectPoint}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select points to use" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Don't use points</SelectItem>
                            {pointOption.map((item, index) => {
                                return (
                                    <SelectItem key={index} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button className="w-full text-white" variant={'default'} onClick={handleCheckout}>
                FILL INFORMATIONS
            </Button>
        </div>
    );
}

export default memo(Checkout);
