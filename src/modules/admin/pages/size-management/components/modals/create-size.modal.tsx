import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { useToast } from '@/components/ui/use-toast';
import useCaller from '@/hooks/useCaller';
import LoadingButton from '@/components/ui/loading-button';

export interface CreateSizeInfo {
    name: string;
    value: string;
}

const initial: CreateSizeInfo = {
    name: '',
    value: '',
};

const CreateSizeModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateSize];
    const { toast } = useToast();

    const [createSizeInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<CreateSizeInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createSizeInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên quy mô', variant: 'destructive' });
            return false;
        }

        if (!createSizeInfo.value.trim()) {
            toast({ title: 'Error', description: 'Phải nhập giới hạn quy mô', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateSize = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/api/Size',
                {
                    method: 'POST',
                    body: createSizeInfo,
                },
                'Tạo quy mô thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateSize);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo quy mô" open={modalState.visible} onClose={() => closeModal(ModalType.CreateSize)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên quy mô</Label>
                    <Input
                        id="name"
                        value={createSizeInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên quy mô"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="value">Giới hạn quy mô</Label>
                    <Input
                        id="value"
                        value={createSizeInfo.value}
                        onChange={handleObjectChange}
                        placeholder="Nhập giới hạn quy mô"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateSize}
                    isLoading={loading}
                    loadingText="Đang tạo quy mô..."
                >
                    Tạo quy mô
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateSizeModal;