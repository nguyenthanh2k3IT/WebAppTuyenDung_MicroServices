import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { useToast } from '@/components/ui/use-toast';
import useCaller from '@/hooks/useCaller';
import LoadingButton from '@/components/ui/loading-button';

export interface UpdateCategoryInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateCategoryModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateCategory];
    const { toast } = useToast();

    const [updateCategoryInfo, setKeyValue, setMultipleValues, resetStateInfo, handleObjectChange] =
        useObjectState<UpdateCategoryInfo>(modalState?.data || { id: '', slug: '', name: '' });

    useEffect(() => {
        const fetchCategory = async () => {
            if (modalState?.data?.id) {
                const result = await callApi(`/blog-service/api/Categories/${modalState.data.id}`, {
                    method: 'GET',
                });
                if (result.succeeded) {
                    setMultipleValues(result.data);
                } else {
                    toast({ title: 'Error', description: 'Không thể lấy thông tin loại', variant: 'destructive' });
                }
            }
        };

        fetchCategory();
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateCategoryInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateCategoryInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên loại', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateCategory = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/blog-service/api/Categories`,
                {
                    method: 'PUT',
                    body: updateCategoryInfo,
                },
                'Cập nhật loại thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateCategory);
                resetStateInfo();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật loại" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateCategory)}>
            <div className="grid grid-cols-1 gap-4 px-4 md:w-[800px] sm:w-full">
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateCategoryInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên loại</Label>
                    <Input
                        id="name"
                        value={updateCategoryInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên loại"
                    />
                </div>
                <LoadingButton
                    className="col-span-1"
                    onClick={handleUpdateCategory}
                    isLoading={loading}
                    loadingText="Đang cập nhật loại..."
                >
                    Cập nhật loại
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateCategoryModal;