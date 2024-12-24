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
import GeneratorHelper from '@/helpers/generator.helper';

const initialState: ProductItem = {
    id: GeneratorHelper.newGuid(),
    productId: '',
    colorId: '',
    color: null,
    additionalPrice: 0,
    images: [],
    items: [],
};

function AddProductItemModal() {
    const { toast } = useToast();
    const { transformSelect } = useSelect({
        initialValue: [],
    });
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const [color, setColor] = useState<SelectOption[]>([]);
    const [addProductInfo, setKeyValue, _, handleObjectChange] = useObjectState<ProductItem>(initialState);

    const modalState = modals[ModalType.CreateProductItem];

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

    const handleaddProduct = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(addProductInfo, ['productId', 'color', 'images']);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const payload: ProductItem = {
            ...addProductInfo,
            productId: modalState.data,
        };
        const result = await callApi(
            `/catalog-service/api/ProductItem`,
            {
                method: 'POST',
                body: payload,
            },
            'Product item created successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.CreateProductItem);
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
                title="Create product"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.CreateProductItem)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="additionalPrice">Additional price</Label>
                        <Input
                            id="additionalPrice"
                            type="number"
                            value={addProductInfo.additionalPrice}
                            onChange={handleObjectChange}
                            placeholder="Enter additional price"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="salePrice">Color</Label>
                        <SingleSelect
                            triggerStyle="w-full"
                            placeHolder={'Please choose color ...'}
                            onChange={handleChangeColor}
                            options={color}
                        />
                    </div>

                    <LoadingButton
                        className="mt-2"
                        onClick={handleaddProduct}
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

export default AddProductItemModal;
