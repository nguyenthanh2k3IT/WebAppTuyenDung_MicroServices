import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import DrawerContainer from '@/components/container/drawer.container';
import { ModalType } from '@/enums/modal.enum';
import useModalContext from '@/hooks/useModal';
import useObjectState from '@/hooks/useObjectState';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AdminNavigate } from '../../navigate';

export interface UpdatePasswordInfo {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const UpdatePasswordModal: React.FC = () => {
    const { toast } = useToast();
    const { modals, closeModal } = useModalContext();
    const modalState = modals[ModalType.UpdatePassword];

    const [updatePasswordInfo, setUpdatePasswordInfo] = useObjectState<UpdatePasswordInfo>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    if (!modalState || !modalState.visible) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUpdatePasswordInfo(id as keyof UpdatePasswordInfo, value);
    };

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleUpdatePassword = () => {
        toast({
            variant: 'success',
            title: 'Update password successfully',
            description: 'You will be navigated to login page',
            duration: 1500,
        });
        closeModal(ModalType.UpdatePassword);

        setTimeout(() => {
            window.location.href = AdminNavigate.login.link;
        }, 1500);
    };

    const renderPasswordInput = (id: keyof UpdatePasswordInfo, label: string, placeholder: string) => (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    id={id}
                    type={showPasswords[id] ? 'text' : 'password'}
                    value={updatePasswordInfo[id]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => togglePasswordVisibility(id)}
                >
                    {showPasswords[id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );

    return (
        <DrawerContainer
            title="Update password"
            open={modalState.visible}
            onClose={() => closeModal(ModalType.UpdatePassword)}
        >
            <div className={'grid items-start gap-4 px-4 md:w-[400px] sm:w-full'}>
                {renderPasswordInput('currentPassword', 'Current Password', 'Enter current password')}
                {renderPasswordInput('newPassword', 'New Password', 'Enter new password')}
                {renderPasswordInput('confirmNewPassword', 'Confirm New Password', 'Confirm new password')}
                <Button variant={'default'} onClick={handleUpdatePassword}>
                    Save changes
                </Button>
            </div>
        </DrawerContainer>
    );
};

export default UpdatePasswordModal;
