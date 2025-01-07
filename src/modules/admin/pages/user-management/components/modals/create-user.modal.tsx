import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import useCaller from '@/hooks/useCaller';
import LoadingButton from '@/components/ui/loading-button';
import { RoleType, UserStatusType } from '@/enums/entity-type.enum';

export interface CreateUserInfo {
    email: string;
    password: string;
    phone: string;
    fullname: string;
    address: string;
    isEmailConfirmed: boolean;
    statusId: string;
    roleId: string;
}

const initial: CreateUserInfo = {
    email: '',
    password: '',
    phone: '',
    fullname: '',
    address: '',
    isEmailConfirmed: false,
    statusId: '',
    roleId: '',
};

const CreateUserModal: React.FC = () => {
    const { loading, callApi } = useCaller<any>();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.CreateUser];
    const { toast } = useToast();

    const [createUserInfo, setCreateUserInfo, resetStateInfo, handleObjectChange] =
        useObjectState<CreateUserInfo>(initial);

    if (!modalState || !modalState.visible) return null;

    const handleSelectChange = (key: keyof CreateUserInfo, value: string) => {
        setCreateUserInfo(key, value);
    };

    const handleSwitchChange = (checked: boolean) => {
        setCreateUserInfo('isEmailConfirmed', checked);
    };

    const validateForm = (): boolean => {
        if (!createUserInfo.fullname.trim()) {
            toast({ title: 'Error', description: 'Full name is required', variant: 'destructive' });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(createUserInfo.email)) {
            toast({ title: 'Error', description: 'Invalid email address', variant: 'destructive' });
            return false;
        }

        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        if (!phoneRegex.test(createUserInfo.phone)) {
            toast({
                title: 'Error',
                description: 'Invalid phone number (should be 10 digits)',
                variant: 'destructive',
            });
            return false;
        }

        if (!createUserInfo.address.trim()) {
            toast({ title: 'Error', description: 'Address is required', variant: 'destructive' });
            return false;
        }

        if (!createUserInfo.roleId) {
            toast({ title: 'Error', description: 'Please select a role', variant: 'destructive' });
            return false;
        }

        if (!createUserInfo.statusId) {
            toast({ title: 'Error', description: 'Please select a status', variant: 'destructive' });
            return false;
        }

        return true;
    };

    const handleCreateUser = async () => {
        if (validateForm()) {
            const result = await callApi(
                '/identity-service/api/User',
                {
                    method: 'POST',
                    body: createUserInfo,
                },
                'User created Successfully',
            );
            if (result.succeeded) {
                closeModal(ModalType.CreateUser);
                resetStateInfo(initial);
                if (modalState.callback) {
                    modalState.callback();
                }
            }
        }
    };

    return (
        <DrawerContainer title="Create User" open={modalState.visible} onClose={() => closeModal(ModalType.CreateUser)}>
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                <div className="grid gap-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                        id="fullname"
                        value={createUserInfo.fullname}
                        onChange={handleObjectChange}
                        placeholder="Enter full name"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={createUserInfo.password}
                        onChange={handleObjectChange}
                        placeholder="Enter password"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={createUserInfo.address}
                        onChange={handleObjectChange}
                        placeholder="Enter address"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={createUserInfo.email}
                            onChange={handleObjectChange}
                            placeholder="Enter email address"
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={createUserInfo.phone}
                            onChange={handleObjectChange}
                            placeholder="Enter phone number"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="grid gap-2 w-full">
                        <Label>Role</Label>
                        <Select
                            onValueChange={(value) => handleSelectChange('roleId', value)}
                            value={createUserInfo.roleId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={RoleType.ADMIN.toString()}>Admin</SelectItem>
                                {/* <SelectItem value={RoleType.CUSTOMER.toString()}>Customer</SelectItem> */}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label>Status</Label>
                        <Select
                            onValueChange={(value) => handleSelectChange('statusId', value)}
                            value={createUserInfo.statusId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={UserStatusType.ACTIVE.toString()}>Active</SelectItem>
                                <SelectItem value={UserStatusType.BANNED.toString()}>Banned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="isEmailConfirmed" className="text-sm font-medium">
                            Email Confirmation
                        </Label>
                        <Switch
                            id="isEmailConfirmed"
                            checked={createUserInfo.isEmailConfirmed}
                            onCheckedChange={handleSwitchChange}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        {createUserInfo.isEmailConfirmed ? 'Email is confirmed' : 'Email is not confirmed'}
                    </p>
                </div>
                <LoadingButton
                    className="mt-2"
                    onClick={handleCreateUser}
                    isLoading={loading}
                    loadingText="Creating User..."
                >
                    Create User
                </LoadingButton>
            </div>
        </DrawerContainer>
    );
};

export default CreateUserModal;
