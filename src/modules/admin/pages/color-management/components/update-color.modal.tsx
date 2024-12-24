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
import { useEffect } from 'react';

const initialState: Color = {
    id: '',
    name: '',
    description: '',
    slug: '',
};

function UpdateColorModal() {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const { toast } = useToast();
    const [updateColorInfo, , setInfo, handleObjectChange] = useObjectState<Color>(initialState);

    const modalState = modals[ModalType.UpdateColor];

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            setInfo({
                id: modalState.data.id || '',
                name: modalState.data.name || '',
                description: modalState.data.description || '',
                slug: modalState.data.slug || '',
            });
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const handleUpdateUser = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateColorInfo);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const result = await callApi(
            `/catalog-service/api/Color`,
            {
                method: 'PUT',
                body: updateColorInfo,
            },
            'User updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.UpdateColor);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    return (
        <div>
            <DrawerContainer
                title="Update Color"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.UpdateColor)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={updateColorInfo.slug}
                            onChange={handleObjectChange}
                            placeholder="Enter slug"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={updateColorInfo.name}
                            onChange={handleObjectChange}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={updateColorInfo.description}
                            onChange={handleObjectChange}
                            placeholder="Enter description"
                        />
                    </div>
                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateUser}
                        isLoading={loading}
                        loadingText="Updating Color..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default UpdateColorModal;
