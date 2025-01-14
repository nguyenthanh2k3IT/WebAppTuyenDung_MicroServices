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

export interface CreateTagnameInfo {
    slug: string;
    name: string;
}

const initial: CreateTagnameInfo = {
    slug: '',
    name: '',
};

const CreateTagnameModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateTagname];
    const { toast } = useToast();

    const [createTagnameInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<CreateTagnameInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!createTagnameInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!createTagnameInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên thẻ', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateTagname = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/blog-service/api/Tagnames',
                {
                    method: 'POST',
                    body: createTagnameInfo,
                },
                'Tạo thẻ thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateTagname);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo thẻ" open={modalState.visible} onClose={() => closeModal(ModalType.CreateTagname)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={createTagnameInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên thẻ</Label>
                    <Input
                        id="name"
                        value={createTagnameInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên thẻ"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateTagname}
                    isLoading={loading}
                    loadingText="Đang tạo thẻ..."
                >
                    Tạo thẻ
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateTagnameModal;