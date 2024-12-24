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

const initialState: ProductItem = {
    id: '',
    productId: '',
    colorId: '',
    color: null,
    additionalPrice: 0,
    images: [],
    items: [],
};

function UpdateProductItemModal() {
    const { toast } = useToast();
    const { transformSelect } = useSelect({
        initialValue: [],
    });
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const [color, setColor] = useState<SelectOption[]>([]);
    const [updateProductInfo, setKeyValue, setInfo, handleObjectChange] = useObjectState<ProductItem>(initialState);

    const modalState = modals[ModalType.UpdateProductItem];

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            const tmp: ProductItem = modalState.data;
            setInfo(tmp);
        }
    }, [modalState]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await callApi(
                '/catalog-service/api/Color',
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                let tmp: Color[] = data;
                const transfer = transformSelect(tmp, 'id', 'name');
                setColor(transfer);
            }
        };
        fetchData();
    }, []);

    if (!modalState || !modalState.visible) return null;

    const handleUpdateProduct = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateProductInfo, ['productId', 'color', 'images']);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/catalog-service/api/ProductItem`,
            {
                method: 'PUT',
                body: updateProductInfo,
            },
            'Product item updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.UpdateProductItem);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    const handleChangeColor = (option: SelectOption) => {
        setKeyValue('colorId' as keyof ProductItem, option.value);
    };

    return (
        <div>
            <DrawerContainer
                title="Update product"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.UpdateProductItem)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="additionalPrice">Additional price</Label>
                        <Input
                            id="additionalPrice"
                            type="number"
                            value={updateProductInfo.additionalPrice}
                            onChange={handleObjectChange}
                            placeholder="Enter additional price"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="salePrice">Color</Label>
                        <SingleSelect
                            triggerStyle="w-full"
                            placeHolder={'Please choose color ...'}
                            defaultValue={updateProductInfo.colorId}
                            onChange={handleChangeColor}
                            options={color}
                        />
                    </div>

                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateProduct}
                        isLoading={loading}
                        loadingText="Updating product..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default UpdateProductItemModal;
