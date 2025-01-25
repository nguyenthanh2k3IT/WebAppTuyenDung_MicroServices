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

export interface UpdateJobCategoryInfo {
    id: string;
    slug: string;
    name: string;
}

const UpdateJobCategoryModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateJobCategory];
    const { toast } = useToast();

    const [updateJobCategoryInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateJobCategoryInfo>({ id: '', slug: '', name: '' });

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchJobCategory = async () => {
                try {
                    const res = await callApi(`/job-service/api/Category/${modalState.data.id}`, {
                        method: 'GET',
                    });
                    if (res.succeeded && res.data) {
                        setMultipleValues(res.data);
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch job category data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch job category:', error);
                    toast({ title: 'Error', description: 'Failed to fetch job category', variant: 'destructive' });
                }
            };
            fetchJobCategory();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        if (!updateJobCategoryInfo.slug.trim()) {
            toast({ title: 'Error', description: 'Phải nhập slug', variant: 'destructive' });
            return false;
        }

        if (!updateJobCategoryInfo.name.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên lĩnh vực', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateJobCategory = async () => {
        if (validateForm()) {
            const result = await callApi(
                `/job-service/api/Category`,
                {
                    method: 'PUT',
                    body: { ...updateJobCategoryInfo, id: updateJobCategoryInfo.id },
                },
                'Cập nhật lĩnh vực thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateJobCategory);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật lĩnh vực" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateJobCategory)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={updateJobCategoryInfo.slug}
                        onChange={handleObjectChange}
                        placeholder="Nhập slug"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên lĩnh vực</Label>
                    <Input
                        id="name"
                        value={updateJobCategoryInfo.name}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên lĩnh vực"
                    />
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleUpdateJobCategory}
                    isLoading={loading}
                    loadingText="Đang cập nhật lĩnh vực..."
                >
                    Cập nhật lĩnh vực
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default UpdateJobCategoryModal;