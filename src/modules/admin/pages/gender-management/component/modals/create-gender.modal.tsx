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

const CreateGenderModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateGender];
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
            toast({ title: 'Error', description: 'Phải nhập tên giới tính', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateGender = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/job-service/api/Gender',
                {
                    method: 'POST',
                    body: createInfo,
                },
                'Tạo kinh nghiệm thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateGender);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo giới tính" open={modalState.visible} onClose={() => closeModal(ModalType.CreateGender)}>
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
                    <Label htmlFor="name">Tên giới tính</Label>
                    <Input
                        id="name"
                        value={createInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên giới tính"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateGender}
                    isLoading={loading}
                    loadingText="Đang tạo giới tính..."
                >
                    Tạo giới tính
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateGenderModal;