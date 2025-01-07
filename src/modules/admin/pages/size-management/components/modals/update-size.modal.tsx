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
import { API } from '@/utils/axios';

export interface UpdateSizeInfo {
    id: string;
    name: string;
    value: string;
}

const UpdateSizeModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateSize];
    const { toast } = useToast();

    const [updateSizeInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateSizeInfo>({ id: '', name: '', value: '' });

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchSize = async () => {
                try {
                    const res = await API.get(`/api/Size/${modalState.data.id}`);
                    const obj: ApiRes<UpdateSizeInfo> = res.data;
                    if (obj.data) {
                        setMultipleValues(obj.data); // Sử dụng setMultipleValues để cập nhật nhiều giá trị cùng lúc
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch size data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch size:', error);
                    toast({ title: 'Error', description: 'Failed to fetch size', variant: 'destructive' });
                }
            };
            fetchSize();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateSizeInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên quy mô', variant: 'destructive' });
            return false;
        }

        if (!updateSizeInfo.value.trim()) {
            toast({ title: 'Error', description: 'Phải nhập giới hạn quy mô', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateSize = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/api/Size`,
                {
                    method: 'PUT',
                    body: { ...updateSizeInfo, id: updateSizeInfo.id },
                },
                'Cập nhật quy mô thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateSize);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật quy mô" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateSize)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên quy mô</Label>
                    <Input
                        id="name"
                        value={updateSizeInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên quy mô"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="value">Giới hạn quy mô</Label>
                    <Input
                        id="value"
                        value={updateSizeInfo.value}
                        onChange={handleObjectChange}
                        placeholder="Nhập giới hạn quy mô"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdateSize}
                    isLoading={loading}
                    loadingText="Đang cập nhật quy mô..."
                >
                    Cập nhật quy mô
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateSizeModal;