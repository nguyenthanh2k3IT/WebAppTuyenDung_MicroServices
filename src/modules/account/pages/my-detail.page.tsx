import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import DetailUserSkeleton from '../components/skeletons/detail-user.skeleton';
import useProfile from '@/hooks/useProfile';
import LoadingButton from '@/components/ui/loading-button';
import useCaller from '@/hooks/useCaller';

function MyDetailPage() {
    const { callApi, loading } = useCaller<User>();
    const { profile, profileLoading, refreshProfile } = useProfile();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        setFullName(profile?.fullname || '');
        setEmail(profile?.email || '');
        setPhone(profile?.phone || '');
        setAddress(profile?.address || '');
    }, [profile]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            fullName: '',
            email: '',
            phone: '',
            address: '',
        };

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^0\d{9}$/.test(phone)) {
            newErrors.phone = 'Phone number must be 10 digits and start with 0';
            isValid = false;
        }

        if (!address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const result = await callApi(
                '/identity-service/api/User/profile',
                {
                    method: 'PUT',
                    body: {
                        id: profile?.id,
                        fullname: fullName,
                        email: email,
                        phone: phone,
                        address: address,
                    },
                },
                'Update information successfully, reloading in 2 seconds...',
            );
            if (result.succeeded) {
                await refreshProfile(); // Refresh the profile data after successful update
            }
        } else {
            console.log('Validation failed');
        }
    };

    const renderInput = (
        id: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        label: string,
    ) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full ${errors[id as keyof typeof errors] ? 'border-red-500' : ''}`}
            />
            {errors[id as keyof typeof errors] && (
                <p className="text-red-500 text-xs mt-1">{errors[id as keyof typeof errors]}</p>
            )}
        </div>
    );

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">MY DETAILS</h2>
            <p className="text-gray-600 mb-6 text-sm">
                Feel free to edit any of your details below so your ASOS account is totally up to date.
            </p>
            {profileLoading ? (
                <DetailUserSkeleton />
            ) : (
                <form onSubmit={handleSubmit}>
                    {renderInput('fullName', fullName, (e) => setFullName(e.target.value), 'FULL NAME*:')}
                    {renderInput('email', email, (e) => setEmail(e.target.value), 'EMAIL*:')}
                    {renderInput('phone', phone, (e) => setPhone(e.target.value), 'PHONE*:')}
                    {renderInput('address', address, (e) => setAddress(e.target.value), 'ADDRESS*:')}
                    <LoadingButton
                        isLoading={loading || profileLoading}
                        type="submit"
                        loadingText="Updating information..."
                        className="w-full bg-gray-900 text-white hover:bg-gray-700"
                    >
                        SAVE CHANGES
                    </LoadingButton>
                </form>
            )}
        </>
    );
}

export default MyDetailPage;
