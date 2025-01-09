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

export interface UpdateCompanyInfo {
    id: string;
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

const initialCompanyState: UpdateCompanyInfo = {
    id: '',
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

const UpdateCompanyModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdateCompany];
    const { toast } = useToast();

    const [updateCompanyInfo, setKeyValue, setMultipleValues, resetState, handleObjectChange] =
        useObjectState<UpdateCompanyInfo>(initialCompanyState);

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

    useEffect(() => {
        if (modalState?.data?.id) {
            const fetchCompany = async () => {
                try {
                    const res = await API.get(`/identity-service/api/Company/${modalState.data.id}`);
                    const obj: ApiRes<UpdateCompanyInfo> = res.data;
                    if (obj.data) {
                        setMultipleValues(obj.data);
                    } else {
                        toast({ title: 'Error', description: 'Failed to fetch company data', variant: 'destructive' });
                    }
                } catch (error) {
                    console.error('Failed to fetch company:', error);
                    toast({ title: 'Error', description: 'Failed to fetch company', variant: 'destructive' });
                }
            };
            fetchCompany();
        }
    }, [modalState?.data?.id]);

    if (!modalState || !modalState.visible) return null;

    const validateForm = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!updateCompanyInfo.email.trim()) {
            toast({ title: 'Error', description: 'Phải nhập email', variant: 'destructive' });
            return false;
        }

        if (!emailRegex.test(updateCompanyInfo.email.trim())) {
            toast({ title: 'Error', description: 'Email không đúng định dạng', variant: 'destructive' });
            return false;
        }

        if (!updateCompanyInfo.phone.trim()) {
            toast({ title: 'Error', description: 'Phải nhập số điện thoại', variant: 'destructive' });
            return false;
        }

        if (!phoneRegex.test(updateCompanyInfo.phone.trim())) {
            toast({ title: 'Error', description: 'Số điện thoại không đúng định dạng', variant: 'destructive' });
            return false;
        }

        if (!updateCompanyInfo.fullname.trim()) {
            toast({ title: 'Error', description: 'Phải nhập tên công ty', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleUpdateCompany = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/identity-service/api/Company',
                {
                    method: 'PUT',
                    body: updateCompanyInfo,
                },
                'Cập nhật công ty thành công',
            );
            if (result.succeeded) {
                closeModal(ModalType.UpdateCompany);
                resetState();
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Cập nhật công ty" open={modalState.visible} onClose={() => closeModal(ModalType.UpdateCompany)}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:w-[800px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={updateCompanyInfo.email}
                        onChange={handleObjectChange}
                        placeholder="Nhập email công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                        id="phone"
                        value={updateCompanyInfo.phone}
                        onChange={handleObjectChange}
                        placeholder="Nhập số điện thoại công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="fullname">Tên công ty</Label>
                    <Input
                        id="fullname"
                        value={updateCompanyInfo.fullname}
                        onChange={handleObjectChange}
                        placeholder="Nhập tên công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input
                        id="avatar"
                        value={updateCompanyInfo.avatar}
                        onChange={handleObjectChange}
                        placeholder="Nhập URL avatar"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="wallpaper">Wallpaper</Label>
                    <Input
                        id="wallpaper"
                        value={updateCompanyInfo.wallpaper}
                        onChange={handleObjectChange}
                        placeholder="Nhập URL wallpaper"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={updateCompanyInfo.website}
                        onChange={handleObjectChange}
                        placeholder="Nhập URL website"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                        id="address"
                        value={updateCompanyInfo.address}
                        onChange={handleObjectChange}
                        placeholder="Nhập địa chỉ công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="introduction">Giới thiệu</Label>
                    <Input
                        id="introduction"
                        value={updateCompanyInfo.introduction}
                        onChange={handleObjectChange}
                        placeholder="Nhập giới thiệu công ty"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sizeId">Quy mô</Label>
                    <select
                        id="sizeId"
                        value={updateCompanyInfo.sizeId}
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
                        value={updateCompanyInfo.provinceIds}
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
                <div className="col-span-1 md:col-span-2">
                    <LoadingButton
                        className="mt-2"
                        onClick={handleUpdateCompany}
                        isLoading={loading}
                        loadingText="Đang cập nhật công ty..."
                    >
                        Cập nhật công ty
                    </LoadingButton>
                </div>
            </div>
        </DrawerContainer>
    );
};

export default UpdateCompanyModal;