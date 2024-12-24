import DrawerContainer from '@/components/container/drawer.container';
import { DatePickerWithRange } from '@/components/date-picker/date-picker-range';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { DiscountTypeEnum } from '@/enums/discount-type.enum';
import { ModalType } from '@/enums/modal.enum';
import GeneratorHelper from '@/helpers/generator.helper';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';

const initialState: Discount = {
    id: GeneratorHelper.newGuid(),
    startDate: dayjs().toDate(),
    endDate: dayjs().add(30, 'day').toDate(),
    code: '',
    condition: '',
    quantity: 0,
    available: false,
    value: 0,
    minimum: 0,
    discountTypeId: null,
    discountType: null,
    discountProducts: null,
};

function UpdateDiscountModal() {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateDiscount];

    const { toast } = useToast();
    const [updateDiscountInfo, setUpdateDiscountInfo, setInfo, handleObjectChange] =
        useObjectState<Discount>(initialState);

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            const tmp: Discount = modalState.data;
            if (tmp) setInfo(tmp);
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const handleupdateDiscount = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateDiscountInfo, [
            'discountType',
            'discountProducts',
            'id',
        ]);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/promotion-service/api/Discount`,
            {
                method: 'PUT',
                body: updateDiscountInfo,
            },
            'Discount updated successfully',
        );
        if (result.succeeded) {
            handleCloseModal();
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    const handleSelectChange = (key: keyof Discount, value: string) => {
        setUpdateDiscountInfo(key, value);
    };

    const handleSwitchChange = (checked: boolean) => {
        setUpdateDiscountInfo('available', checked);
    };

    const handleDateChange = (date: DateRange) => {
        if (date.from) setUpdateDiscountInfo('startDate', date.from);
        if (date.to) setUpdateDiscountInfo('endDate', date.to);
    };

    const handleCloseModal = () => {
        closeModal(ModalType.UpdateDiscount);
        setInfo(initialState);
    };

    return (
        <DrawerContainer title="Create Discount" open={modalState.visible} onClose={handleCloseModal}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Code</Label>
                    <Input
                        id="code"
                        value={updateDiscountInfo.code}
                        onChange={handleObjectChange}
                        placeholder="Enter code"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Condition</Label>
                    <Input
                        id="condition"
                        value={updateDiscountInfo.condition}
                        onChange={handleObjectChange}
                        placeholder="Enter Condition"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="description">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={updateDiscountInfo.quantity}
                            onChange={handleObjectChange}
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="description">Value</Label>
                        <Input
                            id="value"
                            type="number"
                            value={updateDiscountInfo.value}
                            onChange={handleObjectChange}
                            placeholder="Enter value"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="description">Minimum</Label>
                        <Input
                            id="minimum"
                            type="number"
                            value={updateDiscountInfo.minimum}
                            onChange={handleObjectChange}
                            placeholder="Enter minimum"
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label>Type</Label>
                        <Select
                            onValueChange={(value) => handleSelectChange('discountTypeId', value)}
                            value={updateDiscountInfo.discountType?.id}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select discount type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={DiscountTypeEnum.Money}>Money</SelectItem>
                                <SelectItem value={DiscountTypeEnum.Percentage}>Percentage</SelectItem>
                                <SelectItem value={DiscountTypeEnum.Product}>Product</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Start Date - End Date</Label>
                    <DatePickerWithRange
                        onChangeDate={handleDateChange}
                        from={updateDiscountInfo.startDate}
                        to={updateDiscountInfo.endDate}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="isEmailConfirmed" className="text-sm font-medium">
                            Available
                        </Label>
                        <Switch
                            id="isEmailConfirmed"
                            checked={updateDiscountInfo.available}
                            onCheckedChange={handleSwitchChange}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        {updateDiscountInfo.available ? 'Discount is available' : 'Discount is unavailable'}
                    </p>
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleupdateDiscount}
                    isLoading={loading}
                    loadingText="Creating discount..."
                >
                    Save changes
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
}

export default UpdateDiscountModal;