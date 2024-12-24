import DrawerContainer from '@/components/container/drawer.container';
import MultiSelect from '@/components/select/multi.select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import { ModalType } from '@/enums/modal.enum';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import useSelect from '@/hooks/useSelect';
import { useEffect, useState } from 'react';

const initialState: Size = {
    id: '',
    name: '',
    description: '',
    slug: '',
    categories: [],
};

function UpdateSizeModal() {
    const { select, setSelect, transformSelect } = useSelect({
        initialValue: [],
    });
    const [defaultValue, setDefaultValue] = useState<string[]>([]);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const { loading, callApi } = useCaller<Size>();
    const { modals, closeModal } = useModalContext();
    const { toast } = useToast();
    const [updateSizeInfo, , setInfo, handleObjectChange] = useObjectState<Size>(initialState);
    const modalState = modals[ModalType.UpdateSize];

    useEffect(() => {
        const getData = async (id: string) => {
            const { data } = await callApi(
                `/catalog-service/api/Size/detail/${id}`,
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                setInfo(data);
                const transfer = transformSelect(data.categories, 'id', 'name');
                setOptions(transfer);
                setDefaultValue(data.categories.filter((val) => val.selected === true).map((val) => val.id));
            }
        };
        if (modalState && modalState.visible && modalState.data != null) {
            getData(modalState.data.id);
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const handleUpdateUser = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateSizeInfo, ['categories']);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/catalog-service/api/Size`,
            {
                method: 'PUT',
                body: { ...updateSizeInfo, categoryIds: select.map((val) => val.value) },
            },
            'User updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.UpdateSize);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    const onChangeSelect = (option: SelectOption[]) => {
        setSelect(option);
    };

    return (
        <div>
            <DrawerContainer
                title="Update Size"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.UpdateSize)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={updateSizeInfo.slug}
                            onChange={handleObjectChange}
                            placeholder="Enter slug"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={updateSizeInfo.name}
                            onChange={handleObjectChange}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={updateSizeInfo.description}
                            onChange={handleObjectChange}
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Categories</Label>
                        <MultiSelect
                            defaultValue={defaultValue}
                            options={options}
                            onChange={onChangeSelect}
                            placeHolder="Choose categories ..."
                        />
                    </div>
                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateUser}
                        isLoading={loading}
                        loadingText="Updating Size..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default UpdateSizeModal;
