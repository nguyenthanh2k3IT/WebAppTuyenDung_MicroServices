import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { useToast } from '@/components/ui/use-toast';
import useCaller from '@/hooks/useCaller';
import LoadingButton from '@/components/ui/loading-button';
import { API } from '@/utils/axios';

export interface CreateCategoryInfo {
    slug: string;
    name: string;
}

const initial: CreateCategoryInfo = {
    slug: '',
    name: '',
};

const CreateCategoryModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateCategory];
    const { toast } = useToast();

    const [createCategoryInfo, setKeyValue, setMultipleValues, resetStateInfo, handleObjectChange] =
        useObjectState<CreateCategoryInfo>(initial);
    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createCategoryInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!createCategoryInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên loại', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateCategory = async () => {
        if (validateForm()) {
            console.log('createCategoryInfo', createCategoryInfo);
            const result = await callApi(
                '/blog-service/api/Categories',
                {
                    method: 'POST',
                    body: createCategoryInfo,
                },
                'Tạo loại thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateCategory);
                resetStateInfo();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo loại" open={modalState.visible} onClose={() => closeModal(ModalType.CreateCategory)}>
            <div className="grid grid-cols-1 gap-4 px-4 md:w-[800px] sm:w-full">
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={createCategoryInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên loại</Label>
                    <Input
                        id="name"
                        value={createCategoryInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên loại"
                    />
                </div>
                <LoadingButton
                    className="col-span-1"
                    onClick={handleCreateCategory}
                    isLoading={loading}
                    loadingText="Đang tạo loại..."
                >
                    Tạo loại
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateCategoryModal;