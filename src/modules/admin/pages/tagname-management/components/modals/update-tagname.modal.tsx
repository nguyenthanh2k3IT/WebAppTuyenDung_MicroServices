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

export interface UpdateTagnameInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateTagnameModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateTagname];
    const { toast } = useToast();

    const [updateTagnameInfo, setKeyValue, setMultipleValues, resetStateInfo, handleObjectChange] =
        useObjectState<UpdateTagnameInfo>(modalState?.data || { id: '', slug: '', name: '' });

    useEffect(() => {
        const fetchTagname = async () => {
            if (modalState?.data?.id) {
                const result = await callApi(`/blog-service/api/Tagnames/${modalState.data.id}`, {
                    method: 'GET',
                });
                if (result.succeeded) {
                    setMultipleValues(result.data);
                } else {
                    toast({ title: 'Error', description: 'Không thể lấy thông tin thẻ', variant: 'destructive' });
                }
            }
        };

        fetchTagname();
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateTagnameInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateTagnameInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên thẻ', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateTagname = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/blog-service/api/Tagnames`,
                {
                    method: 'PUT',
                    body: updateTagnameInfo,
                },
                'Cập nhật thẻ thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateTagname);
                resetStateInfo();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật thẻ" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateTagname)}>
            <div className="grid grid-cols-1 gap-4 px-4 md:w-[800px] sm:w-full">
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateTagnameInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên thẻ</Label>
                    <Input
                        id="name"
                        value={updateTagnameInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên thẻ"
                    />
                </div>
                <LoadingButton
                    className="col-span-1"
                    onClick={handleUpdateTagname}
                    isLoading={loading}
                    loadingText="Đang cập nhật thẻ..."
                >
                    Cập nhật thẻ
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateTagnameModal;