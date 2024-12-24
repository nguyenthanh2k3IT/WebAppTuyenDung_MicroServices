import DrawerContainer from '@/components/container/drawer.container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import { ModalType } from '@/enums/modal.enum';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { useEffect, useState } from 'react';
import SingleSelect from '@/components/select/index';
import useSelect from '@/hooks/useSelect';
import { useParams } from 'react-router-dom';

const initialState: Variation = {
    id: '',
    qtyDisplay: 0,
    qtyInStock: 0,
    stock: 0,
    productItemId: null,
    sizeId: null,
    size: null,
};

function UpdateVariationModal() {
    const { id } = useParams();
    const { toast } = useToast();
    const { transformSelect } = useSelect({
        initialValue: [],
    });
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const [size, setSize] = useState<SelectOption[]>([]);
    const [updateVariationInfo, setKeyValue, setInfo, handleObjectChange] = useObjectState<Variation>(initialState);

    const modalState = modals[ModalType.UpdateVariation];

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            const tmp: Variation = modalState.data;
            setInfo(tmp);
        }
    }, [modalState]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await callApi(
                `/catalog-service/api/Size/product-item/${id}`,
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                let tmp: Size[] = data;
                const transfer = transformSelect(tmp, 'id', 'name');
                setSize(transfer);
            }
        };
        fetchData();
    }, []);

    if (!modalState || !modalState.visible) return null;

    const handleUpdateVariation = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateVariationInfo, [
            'productId',
            'color',
            'images',
        ]);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/catalog-service/api/Variation`,
            {
                method: 'PUT',
                body: updateVariationInfo,
            },
            'Variation updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.UpdateVariation);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    const handleChangeSize = (option: SelectOption) => {
        setKeyValue('sizeId' as keyof Variation, option.value);
    };

    return (
        <div>
            <DrawerContainer
                title="Update variation"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.UpdateVariation)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="additionalPrice">Quantity display</Label>
                        <Input
                            id="qtyDisplay"
                            type="number"
                            value={updateVariationInfo.qtyDisplay}
                            onChange={handleObjectChange}
                            placeholder="Enter quantity display"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="additionalPrice">Quantity in stock</Label>
                        <Input
                            id="qtyInStock"
                            type="number"
                            value={updateVariationInfo.qtyInStock}
                            onChange={handleObjectChange}
                            placeholder="Enter quantity in stock"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="additionalPrice">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            value={updateVariationInfo.stock}
                            onChange={handleObjectChange}
                            placeholder="Enter stock"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="salePrice">Size</Label>
                        <SingleSelect
                            triggerStyle="w-full"
                            placeHolder={'Please choose size ...'}
                            defaultValue={updateVariationInfo.sizeId || undefined}
                            onChange={handleChangeSize}
                            options={size}
                        />
                    </div>

                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateVariation}
                        isLoading={loading}
                        loadingText="Updating variation..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default UpdateVariationModal;
