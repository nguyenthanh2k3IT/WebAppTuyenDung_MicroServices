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

export interface UpdateRankInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateRankModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateRank];
    const { toast } = useToast();

    const [updateRankInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateRankInfo>({ id: '', slug: '', name: '' });

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchRank = async () => {
                try {
                    const res = await callApi(`/job-service/api/Rank/${modalState.data.id}`, {
                        method: 'GET',
                    });
                    if (res.succeeded && res.data) {
                        setMultipleValues(res.data);
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch rank data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch rank:', error);
                    toast({ title: 'Error', description: 'Failed to fetch rank', variant: 'destructive' });
                }
            };
            fetchRank();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateRankInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateRankInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên cấp bậc', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateRank = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/job-service/api/Rank`,
                {
                    method: 'PUT',
                    body: { ...updateRankInfo, id: updateRankInfo.id },
                },
                'Cập nhật cấp bậc thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateRank);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật cấp bậc" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateRank)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateRankInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên cấp bậc</Label>
                    <Input
                        id="name"
                        value={updateRankInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên cấp bậc"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdateRank}
                    isLoading={loading}
                    loadingText="Đang cập nhật cấp bậc..."
                >
                    Cập nhật cấp bậc
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateRankModal;