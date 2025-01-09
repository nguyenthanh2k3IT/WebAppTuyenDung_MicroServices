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

export interface UpdateProvinceInfo {
    id: string;
    name: string;
    code: string;
    area: string;
    areaName: string;
}

const UpdateProvinceModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateProvince];
    const { toast } = useToast();

    const [updateProvinceInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateProvinceInfo>({ id: '', name: '', code: '', area: '', areaName: '' });

    useEffect(() => {
        if (modalState?.data) {
            setMultipleValues(modalState.data);
        }
    }, [modalState?.data]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateProvinceInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên tỉnh thành', variant: 'destructive' });
            return false;
        }

        if (!updateProvinceInfo.code.trim()) {
            toast({ title: 'Error', description: 'Phải nhập mã tỉnh thành', variant: 'destructive' });
            return false;
        }

        if (!updateProvinceInfo.area.trim()) {
            toast({ title: 'Error', description: 'Phải nhập mã khu vực', variant: 'destructive' });
            return false;
        }

        if (!updateProvinceInfo.areaName.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên khu vực', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateProvince = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/identity-service/api/Province',
                {
                    method: 'PUT',
                    body: { ...updateProvinceInfo, id: modalState.data.id },
                },
                'Cập nhật tỉnh thành thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateProvince);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật tỉnh thành" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateProvince)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="code">Mã tỉnh thành</Label>
                    <Input
                        id="code"
                        value={updateProvinceInfo.code}
                        onChange={handleObjectChange}
                        placeholder="Nhập mã tỉnh thành. VD: HN"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên tỉnh thành</Label>
                    <Input
                        id="name"
                        value={updateProvinceInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên tỉnh thành. VD: Hà Nội"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="area">Mã khu vực</Label>
                    <Input
                        id="area"
                        value={updateProvinceInfo.area}
                        onChange={handleObjectChange}
                        placeholder="Nhập mã khu vực. VD: MB"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="areaName">Tên khu vực</Label>
                    <Input
                        id="areaName"
                        value={updateProvinceInfo.areaName}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên khu vực. VD: Miền Bắc"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdateProvince}
                    isLoading={loading}
                    loadingText="Đang cập nhật tỉnh thành..."
                >
                    Cập nhật tỉnh thành
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateProvinceModal;