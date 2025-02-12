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

export interface UpdateExperienceInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateExperienceModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateExperience];
    const { toast } = useToast();

    const [updateExperienceInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateExperienceInfo>({ id: '', slug: '', name: '' });

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchExperience = async () => {
                try {
                    const res = await callApi(`/job-service/api/Experience/${modalState.data.id}`, {
                        method: 'GET',
                    });
                    if (res.succeeded && res.data) {
                        setMultipleValues(res.data);
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch experience data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch experience:', error);
                    toast({ title: 'Error', description: 'Failed to fetch experience', variant: 'destructive' });
                }
            };
            fetchExperience();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateExperienceInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateExperienceInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên kinh nghiệm', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateExperience = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/job-service/api/Experience`,
                {
                    method: 'PUT',
                    body: { ...updateExperienceInfo, id: updateExperienceInfo.id },
                },
                'Cập nhật kinh nghiệm thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateExperience);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật kinh nghiệm" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateExperience)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateExperienceInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên kinh nghiệm</Label>
                    <Input
                        id="name"
                        value={updateExperienceInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên kinh nghiệm"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdateExperience}
                    isLoading={loading}
                    loadingText="Đang cập nhật kinh nghiệm..."
                >
                    Cập nhật kinh nghiệm
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateExperienceModal;