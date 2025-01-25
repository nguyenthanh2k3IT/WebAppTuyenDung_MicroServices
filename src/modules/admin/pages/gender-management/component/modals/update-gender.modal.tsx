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

export interface UpdateGenderInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateGenderModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateGender];
    const { toast } = useToast();

    const [updateGenderInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateGenderInfo>({ id: '', slug: '', name: '' });

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchGender = async () => {
                try {
                    const res = await callApi(`/job-service/api/Gender/${modalState.data.id}`, {
                        method: 'GET',
                    });
                    if (res.succeeded && res.data) {
                        setMultipleValues(res.data);
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch gender data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch gender:', error);
                    toast({ title: 'Error', description: 'Failed to fetch gender', variant: 'destructive' });
                }
            };
            fetchGender();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateGenderInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateGenderInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên giới tính', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdate = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/job-service/api/Gender`,
                {
                    method: 'PUT',
                    body: { ...updateGenderInfo, id: updateGenderInfo.id },
                },
                'Cập nhật giới tính thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateGender);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật giới tính" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateGender)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateGenderInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên giới tính</Label>
                    <Input
                        id="name"
                        value={updateGenderInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên giới tính"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdate}
                    isLoading={loading}
                    loadingText="Đang cập nhật giới tính..."
                >
                    Cập nhật giới tính
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateGenderModal;