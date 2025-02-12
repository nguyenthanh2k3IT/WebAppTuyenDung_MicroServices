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

export interface CreateWorkTypeInfo {
    slug: string;
    name: string;
}

const initial: CreateWorkTypeInfo = {
    slug: '',
    name: '',
};

const CreateWorkTypeModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateWorkType];
    const { toast } = useToast();

    const [createWorkTypeInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<CreateWorkTypeInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createWorkTypeInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!createWorkTypeInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên hình thức làm việc', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateWorkType = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/job-service/api/WorkType',
                {
                    method: 'POST',
                    body: createWorkTypeInfo,
                },
                'Tạo hình thức làm việc thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateWorkType);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo hình thức làm việc" open={modalState.visible} onClose={() => closeModal(ModalType.CreateWorkType)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={createWorkTypeInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên hình thức làm việc</Label>
                    <Input
                        id="name"
                        value={createWorkTypeInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên hình thức làm việc"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateWorkType}
                    isLoading={loading}
                    loadingText="Đang tạo hình thức làm việc..."
                >
                    Tạo hình thức làm việc
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateWorkTypeModal;