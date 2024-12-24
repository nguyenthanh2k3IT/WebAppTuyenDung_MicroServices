import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import useCaller from '@/hooks/useCaller';
import useProfile from '@/hooks/useProfile';
import LoadingButton from '@/components/ui/loading-button';

function MyPasswordPage() {
    const { callApi, loading } = useCaller<boolean>();
    const { profile } = useProfile();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        };

        // Validate current password
        if (!currentPassword.trim()) {
            newErrors.currentPassword = 'Current password is required';
            isValid = false;
        }

        // Validate new password
        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (newPassword.length < 6 || newPassword.length > 15) {
            newErrors.newPassword = 'New password must be between 6 and 15 characters long';
            isValid = false;
        } else if (/\s/.test(newPassword)) {
            newErrors.newPassword = 'New password must not contain whitespace';
            isValid = false;
        } else if (/[A-Z]/.test(newPassword)) {
            newErrors.newPassword = 'New password must not contain uppercase letters';
            isValid = false;
        } else if (/[^a-z0-9]/.test(newPassword)) {
            newErrors.newPassword = 'New password must not contain special characters';
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
            isValid = false;
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await callApi(
                '/identity-service/api/Auth/update-password',
                {
                    method: 'PUT',
                    body: {
                        id: profile?.id,
                        currentPassword,
                        newPassword,
                    },
                },
                'Update password successfully !',
            );
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        switch (field) {
            case 'current':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
        }
    };

    const renderPasswordInput = (
        id: 'currentPassword' | 'newPassword' | 'confirmPassword',
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        label: string,
        showPassword: boolean,
        toggleVisibility: () => void,
    ) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <Input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    className={`w-full pr-10 ${errors[id] ? 'border-red-500' : ''}`}
                    required
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={toggleVisibility}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
        </div>
    );

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">CHANGE PASSWORD</h2>
            <p className="text-gray-600 mb-6 text-sm">Manage your password to keep your account secure.</p>
            <form onSubmit={handleSubmit}>
                {renderPasswordInput(
                    'currentPassword',
                    currentPassword,
                    (e) => setCurrentPassword(e.target.value),
                    'Current Password*',
                    showCurrentPassword,
                    () => togglePasswordVisibility('current'),
                )}
                {renderPasswordInput(
                    'newPassword',
                    newPassword,
                    (e) => setNewPassword(e.target.value),
                    'New Password*',
                    showNewPassword,
                    () => togglePasswordVisibility('new'),
                )}
                {renderPasswordInput(
                    'confirmPassword',
                    confirmPassword,
                    (e) => setConfirmPassword(e.target.value),
                    'Confirm New Password*',
                    showConfirmPassword,
                    () => togglePasswordVisibility('confirm'),
                )}
                <LoadingButton
                    isLoading={loading}
                    type="submit"
                    loadingText="Updating password ..."
                    className="w-full bg-gray-900 text-white hover:bg-gray-800"
                >
                    SAVE CHANGES
                </LoadingButton>
            </form>
        </>
    );
}

export default MyPasswordPage;
