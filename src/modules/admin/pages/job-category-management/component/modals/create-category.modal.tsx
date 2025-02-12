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

export interface CreateInfo {
    slug: string;
    name: string;
}

const initial: CreateInfo = {
    slug: '',
    name: '',
};

const CreateJobCategoryModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateJobCategory];
    const { toast } = useToast();

    const [createInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<CreateInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!createInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên lĩnh vực', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateJobCategory = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/job-service/api/Category',
                {
                    method: 'POST',
                    body: createInfo,
                },
                'Tạo lĩnh vực thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateJobCategory);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo lĩnh vực" open={modalState.visible} onClose={() => closeModal(ModalType.CreateJobCategory)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={createInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên lĩnh vực</Label>
                    <Input
                        id="name"
                        value={createInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên lĩnh vực"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateJobCategory}
                    isLoading={loading}
                    loadingText="Đang tạo lĩnh vực..."
                >
                    Tạo lĩnh vực
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateJobCategoryModal;