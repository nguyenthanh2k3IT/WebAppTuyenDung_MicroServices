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

export interface UpdateWorkTypeInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateWorkTypeModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateWorkType];
    const { toast } = useToast();

    const [updateWorkTypeInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateWorkTypeInfo>({ id: '', slug: '', name: '' });

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchWorkType = async () => {
                try {
                    const res = await callApi(`/job-service/api/WorkType/${modalState.data.id}`, {
                        method: 'GET',
                    });
                    if (res.succeeded && res.data) {
                        setMultipleValues(res.data);
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch work type data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch work type:', error);
                    toast({ title: 'Error', description: 'Failed to fetch work type', variant: 'destructive' });
                }
            };
            fetchWorkType();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateWorkTypeInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateWorkTypeInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên hình thức làm việc', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateWorkType = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/job-service/api/WorkType`,
                {
                    method: 'PUT',
                    body: { ...updateWorkTypeInfo, id: updateWorkTypeInfo.id },
                },
                'Cập nhật hình thức làm việc thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateWorkType);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật hình thức làm việc" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateWorkType)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateWorkTypeInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên hình thức làm việc</Label>
                    <Input
                        id="name"
                        value={updateWorkTypeInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên hình thức làm việc"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdateWorkType}
                    isLoading={loading}
                    loadingText="Đang cập nhật hình thức làm việc..."
                >
                    Cập nhật hình thức làm việc
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateWorkTypeModal;