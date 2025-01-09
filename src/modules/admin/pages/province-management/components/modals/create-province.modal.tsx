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

export interface CreateProvinceInfo {
    name: string;
    code: string;
    area: string;
    areaName: string;
}

const initial: CreateProvinceInfo = {
    name: '',
    code: '',
    area: '',
    areaName: '',
};

const CreateProvinceModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateProvince];
    const { toast } = useToast();

    const [createProvinceInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<CreateProvinceInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createProvinceInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên tỉnh thành', variant: 'destructive' });
            return false;
        }

        if (!createProvinceInfo.code.trim()) {
            toast({ title: 'Error', description: 'Phải nhập mã tỉnh thành', variant: 'destructive' });
            return false;
        }

        if (!createProvinceInfo.area.trim()) {
            toast({ title: 'Error', description: 'Phải nhập mã khu vực', variant: 'destructive' });
            return false;
        }

        if (!createProvinceInfo.areaName.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên khu vực', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateProvince = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/identity-service/api/Province',
                {
                    method: 'POST',
                    body: createProvinceInfo,
                },
                'Tạo tỉnh thành thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateProvince);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo tỉnh thành" open={modalState.visible} onClose={() => closeModal(ModalType.CreateProvince)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="code">Mã tỉnh thành</Label>
                    <Input
                        id="code"
                        value={createProvinceInfo.code}
                        onChange={handleObjectChange}
                        placeholder="Nhập mã tỉnh thành. VD: HN"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên tỉnh thành</Label>
                    <Input
                        id="name"
                        value={createProvinceInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên tỉnh thành. VD: Hà Nội"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="area">Mã khu vực</Label>
                    <Input
                        id="area"
                        value={createProvinceInfo.area}
                        onChange={handleObjectChange}
                        placeholder="Nhập mã khu vực. VD: 01"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="areaName">Tên khu vực</Label>
                    <Input
                        id="areaName"
                        value={createProvinceInfo.areaName}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên khu vực. VD: Miền Bắc"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateProvince}
                    isLoading={loading}
                    loadingText="Đang tạo tỉnh thành..."
                >
                    Tạo tỉnh thành
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateProvinceModal;