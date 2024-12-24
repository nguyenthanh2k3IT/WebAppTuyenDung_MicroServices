import DrawerContainer from '@/components/container/drawer.container';
import MultiSelect from '@/components/select/multi.select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import { ModalType } from '@/enums/modal.enum';
import GeneratorHelper from '@/helpers/generator.helper';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import useSelect from '@/hooks/useSelect';
import { useEffect, useState } from 'react';

const initialState: Size = {
    id: GeneratorHelper.newGuid(),
    name: '',
    description: '',
    slug: '',
    categories: [],
};

function AddSizeModal() {
    const { select, setSelect, transformSelect } = useSelect({
        initialValue: [],
    });
    const [options, setOptions] = useState<SelectOption[]>([]);
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateSize];
    const { toast } = useToast();
    const [addSizeInfo, , , handleObjectChange] = useObjectState<Size>(initialState);

    useEffect(() => {
        const getData = async () => {
            const { data } = await callApi(
                `/catalog-service/api/Category`,
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                const transfer = transformSelect(data, 'id', 'name');
                setOptions(transfer);
            }
        };

        if (modalState && modalState.visible) {
            getData();
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const handleAddSize = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(addSizeInfo, ['id', 'categories']);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/catalog-service/api/Size`,
            {
                method: 'POST',
                body: { ...addSizeInfo, categoryIds: select.map((val) => val.value) },
            },
            'User addd successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.CreateSize);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    const onChangeSelect = (option: SelectOption[]) => {
        setSelect(option);
    };

    return (
        <DrawerContainer title="Create Size" open={modalState.visible} onClose={() => closeModal(ModalType.CreateSize)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={addSizeInfo.slug} onChange={handleObjectChange} placeholder="Enter slug" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={addSizeInfo.name} onChange={handleObjectChange} placeholder="Enter name" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={addSizeInfo.description}
                        onChange={handleObjectChange}
                        placeholder="Enter description"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Categories</Label>
                    <MultiSelect options={options} onChange={onChangeSelect} placeHolder="Choose categories ..." />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleAddSize}
                    isLoading={loading}
                    loadingText="Creating Size..."
                >
                    Save changes
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
}

export default AddSizeModal;
