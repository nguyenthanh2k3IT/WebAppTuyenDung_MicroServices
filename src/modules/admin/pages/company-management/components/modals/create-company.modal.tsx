import React, { useEffect, useState } from 'react';
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

export interface CreateCompanyInfo {
    email: string;
    phone: string;
    fullname: string;
    avatar: string;
    wallpaper: string;
    website: string;
    address: string;
    introduction: string;
    sizeId: string;
    provinceIds: string[];
}

const initial: CreateCompanyInfo = {
    email: '',
    phone: '',
    fullname: '',
    avatar: '',
    wallpaper: '',
    website: '',
    address: '',
    introduction: '',
    sizeId: '',
    provinceIds: [],
};

const CreateCompanyModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateCompany];
    const { toast } = useToast();

    const [createCompanyInfo, setKeyValue, setMultipleValues, resetStateInfo, handleObjectChange] =
        useObjectState<CreateCompanyInfo>(initial);

    interface Size {
        id: string;
        name: string;
    }

    interface Province {
        id: string;
        name: string;
    }

    const [sizes, setSizes] = useState<Size[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const res = await API.get('/identity-service/api/Size');
                if (res.data && res.data.succeeded) {
                    setSizes(res.data.data);
                } else {
                    setSizes([]);
                }
            } catch (error) {
                console.error('Failed to fetch sizes:', error);
                setSizes([]);
            }
        };

        const fetchProvinces = async () => {
            try {
                const res = await API.get('/identity-service/api/Province');
                if (res.data && res.data.succeeded) {
                    setProvinces(res.data.data);
                } else {
                    setProvinces([]);
                }
            } catch (error) {
                console.error('Failed to fetch provinces:', error);
                setProvinces([]);
            }
        };

        fetchSizes();
        fetchProvinces();
    }, []);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!createCompanyInfo.email.trim()) {
            toast({ title: 'Error', description: 'Phải nhập email', variant: 'destructive' });
            return false;
        }

        if (!emailRegex.test(createCompanyInfo.email.trim())) {
            toast({ title: 'Error', description: 'Email không đúng định dạng', variant: 'destructive' });
            return false;
        }

        if (!createCompanyInfo.phone.trim()) {
            toast({ title: 'Error', description: 'Phải nhập số điện thoại', variant: 'destructive' });
            return false;
        }

        if (!phoneRegex.test(createCompanyInfo.phone.trim())) {
            toast({ title: 'Error', description: 'Số điện thoại không đúng định dạng', variant: 'destructive' });
            return false;
        }

        if (!createCompanyInfo.fullname.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên công ty', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateCompany = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/identity-service/api/Company',
                {
                    method: 'POST',
                    body: createCompanyInfo,
                },
                'Tạo công ty thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateCompany);
                resetStateInfo();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Tạo công ty" open={modalState.visible} onClose={() => closeModal(ModalType.CreateCompany)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:w-[800px] sm:w-full">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={createCompanyInfo.email}
                        onChange={handleObjectChange}
                        placeholder="Nhập email công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                        id="phone"
                        value={createCompanyInfo.phone}
                        onChange={handleObjectChange}
                        placeholder="Nhập số điện thoại công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="fullname">Tên công ty</Label>
                    <Input
                        id="fullname"
                        value={createCompanyInfo.fullname}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input
                        id="avatar"
                        value={createCompanyInfo.avatar}
                        onChange={handleObjectChange}
                        placeholder="Nhập URL avatar"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="wallpaper">Wallpaper</Label>
                    <Input
                        id="wallpaper"
                        value={createCompanyInfo.wallpaper}
                        onChange={handleObjectChange}
                        placeholder="Nhập URL wallpaper"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={createCompanyInfo.website}
                        onChange={handleObjectChange}
                        placeholder="Nhập URL website"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                        id="address"
                        value={createCompanyInfo.address}
                        onChange={handleObjectChange}
                        placeholder="Nhập địa chỉ công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="introduction">Giới thiệu</Label>
                    <Input
                        id="introduction"
                        value={createCompanyInfo.introduction}
                        onChange={handleObjectChange}
                        placeholder="Nhập giới thiệu công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sizeId">Quy mô</Label>
                    <select
                        id="sizeId"
                        value={createCompanyInfo.sizeId}
                        onChange={(e) => setKeyValue('sizeId', e.target.value)}
                    >
                        <option value="">Chọn quy mô</option>
                        {sizes.map((size) => (
                            <option key={size.id} value={size.id}>
                                {size.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="provinceIds">Tỉnh thành</Label>
                    <select
                        id="provinceIds"
                        value={createCompanyInfo.provinceIds}
                        onChange={(e) => setMultipleValues({ provinceIds: Array.from(e.target.selectedOptions, option => option.value) })}
                        multiple
                    >
                        {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>
                <LoadingButton
                    className="col-span-1 md:col-span-2"
                    onClick={handleCreateCompany}
                    isLoading={loading}
                    loadingText="Đang tạo công ty..."
                >
                    Tạo công ty
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateCompanyModal;