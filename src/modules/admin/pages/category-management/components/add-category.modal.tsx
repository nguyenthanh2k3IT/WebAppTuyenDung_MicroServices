import DrawerContainer from '@/components/container/drawer.container';
import Flex from '@/components/container/flex.container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/upload/image-upload';
import { ModalType } from '@/enums/modal.enum';
import GeneratorHelper from '@/helpers/generator.helper';
import ValidatorHelper from '@/helpers/validator.helper';
import useCaller from '@/hooks/useCaller';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { uploadImage } from '@/services/storage.service';
import APIEndpoint from '@/utils/api.endpoint';
import { useState } from 'react';

function AddCategoryModal() {
    const [files, setFiles] = useState<File[]>([]);
    const { loading, setLoading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateCategory];

    const { toast } = useToast();
    const [updateCategoryInfo, , , handleObjectChange] = useObjectState<Category>({
        id: GeneratorHelper.newGuid(),
        name: '',
        description: '',
        slug: '',
        imageFile: '',
    });

    if (!modalState || !modalState.visible) return null;

    const handleAddCategory = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(updateCategoryInfo, ['imageFile', 'id', 'parentId']);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const payload: Category = updateCategoryInfo;
        if (files && files.length > 0) {
            setLoading(true);
            const url = await uploadImage(files[0]);
            payload.imageFile = url ? url : payload.imageFile;
        }
        if (modalState.data) payload.parentId = modalState.data;
        const result = await callApi(
            APIEndpoint.categoryRoot,
            {
                method: 'POST',
                body: payload,
            },
            'User updated successfully',
        );
        if (result.succeeded) {
            closeModal(ModalType.CreateCategory);
            if (modalState.callback) {
                modalState.callback();
            }
        }
    };

    return (
        <DrawerContainer
            title="Create Category"
            open={modalState.visible}
            onClose={() => closeModal(ModalType.CreateCategory)}
        >
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="imageFile">Image</Label>
                    <Flex items="center" justify="center" className="space-x-2">
                        <ImageUpload maxFiles={1} onChangeFiles={(files) => setFiles(files)} size="sm" />
                    </Flex>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateCategoryInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Enter slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={updateCategoryInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Enter name"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={updateCategoryInfo.description}
                        onChange={handleObjectChange}
                        placeholder="Enter description"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleAddCategory}
                    isLoading={loading}
                    loadingText="Creating Category..."
                >
                    Save changes
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
}

export default AddCategoryModal;