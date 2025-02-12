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

export interface CreateExperienceInfo {
    slug: string;
    name: string;
}

const initial: CreateExperienceInfo = {
    slug: '',
    name: '',
};

const CreateExperienceModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateExperience];
    const { toast } = useToast();

    const [createExperienceInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<CreateExperienceInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createExperienceInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!createExperienceInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên kinh nghiệm', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateExperience = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/job-service/api/Experience',
                {
                    method: 'POST',
                    body: createExperienceInfo,
                },
                'Tạo kinh nghiệm thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateExperience);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo kinh nghiệm" open={modalState.visible} onClose={() => closeModal(ModalType.CreateExperience)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={createExperienceInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên kinh nghiệm</Label>
                    <Input
                        id="name"
                        value={createExperienceInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên kinh nghiệm"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateExperience}
                    isLoading={loading}
                    loadingText="Đang tạo kinh nghiệm..."
                >
                    Tạo kinh nghiệm
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateExperienceModal;