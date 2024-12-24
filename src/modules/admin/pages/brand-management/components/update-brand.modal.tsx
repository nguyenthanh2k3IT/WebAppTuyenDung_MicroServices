import DrawerContainer from '@/components/container/drawer.container';
import Flex from '@/components/container/flex.container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/upload/image-upload';
import { ModalType } from '@/enums/modal.enum';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { uploadImage } from '@/services/storage.service';
import { useEffect, useState } from 'react';

const initialState: Brand = {
    id: '',
    name: '',
    description: '',
    slug: '',
    image: '',
};

function UpdateBrandModal() {
    const [files, setFiles] = useState<File[]>([]);
    const { loading, setLoading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const { toast } = useToast();
    const [updateBrandInfo, _, setInfo, handleObjectChange] = useObjectState<Brand>(initialState);

    const modalState = modals[ModalType.UpdateBrand];

    useEffect(() => {
        if (modalState && modalState.visible && modalState.data) {
            setInfo({
                id: modalState.data.id || '',
                name: modalState.data.name || '',
                description: modalState.data.description || '',
                slug: modalState.data.slug || '',
                image: modalState.data.image || '',
            });
        }
    }, [modalState]);

    if (!modalState || !modalState.visible) return null;

    const handleUpdateUser = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateBrandInfo);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const payload: Brand = updateBrandInfo;
        if (files && files.length > 0) {
            setLoading(true);
            const url = await uploadImage(files[0]);
            payload.image = url ? url : payload.image;
        }
        const result = await callApi(
            `/catalog-service/api/Brand`,
            {
                method: 'PUT',
                body: payload,
            },
            'User updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.UpdateBrand);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    return (
        <div>
            <DrawerContainer
                title="Update Brand"
                open={modalState.visible}
                onClose={() => closeModal(ModalType.UpdateBrand)}
            >
                <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <Flex items="center" justify="center" className="space-x-2">
                            {files && files.length === 0 && (
                                <img src={updateBrandInfo.image} alt="image" className="w-24" />
                            )}
                            <ImageUpload maxFiles={1} onChangeFiles={(files) => setFiles(files)} size="sm" />
                        </Flex>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={updateBrandInfo.slug}
                            onChange={handleObjectChange}
                            placeholder="Enter slug"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={updateBrandInfo.name}
                            onChange={handleObjectChange}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={updateBrandInfo.description}
                            onChange={handleObjectChange}
                            placeholder="Enter description"
                        />
                    </div>
                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateUser}
                        isLoading={loading}
                        loadingText="Updating Brand..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </DrawerContainer>
        </div>
    );
}

export default UpdateBrandModal;
