import { getToken } from '@/helpers/storage.helper';
import { useRootSelector } from './useRootSelector';
import { API } from '@/utils/axios';
import { setProfileAction, clearProfileAction } from '@/redux/slicers/profile.slice';
import { useDispatch } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import { useState, useCallback, useMemo } from 'react';

const useProfile = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const token = getToken();
    const profileFromStore = useRootSelector((state) => state.profile.user);
    const [profile, setProfile] = useState<Profile | null>(profileFromStore);
    const [profileLoading, setProfileLoading] = useState(!profileFromStore);

    // Xử lý khi không có token
    const handleNoToken = useCallback(() => {
        setProfile(null);
        setProfileLoading(false);
        dispatch(clearProfileAction());
    }, [dispatch]);

    // Kiểm tra token và xử lý profile
    useMemo(() => {
        if (!token) {
            handleNoToken();
        }
    }, [token, handleNoToken]); // Phụ thuộc vào token và handleNoToken

    const fetchProfile = useCallback(async () => {
        if (!token) {
            handleNoToken();
            return null;
        }

        try {
            setProfileLoading(true);
            const response = await API.get('/identity-service/api/Auth/profile');
            if (!response.data) {
                handleNoToken();
                toast({
                    variant: 'destructive',
                    title: 'Failed',
                    description: 'An unknown error occurred',
                    duration: 2000,
                });
                return null;
            }
            const profileResponse: ApiRes<Profile> = response.data!;
            if (!profileResponse.succeeded || profileResponse.data === null) {
                handleNoToken();
                toast({
                    variant: 'destructive',
                    title: 'Failed',
                    description: profileResponse.errorMessage || 'An unknown error occurred',
                    duration: 2000,
                });
                return null;
            }
            const profileData = profileResponse.data;
            dispatch(setProfileAction(profileData));
            setProfile(profileData);
            return profileData;
        } catch (error) {
            handleNoToken();
            toast({
                variant: 'destructive',
                title: 'Failed',
                description: error instanceof Error ? error.message : 'An unknown error occurred',
                duration: 2000,
            });
            setProfile(null);
            return null;
        } finally {
            setProfileLoading(false);
        }
    }, [dispatch, handleNoToken, token, toast]); // Phụ thuộc vào dispatch, handleNoToken, token, toast

    const refreshProfile = useCallback(async () => {
        const updatedProfile = await fetchProfile();
        if (updatedProfile) {
            setProfile(updatedProfile);
        }
    }, [fetchProfile]); // Phụ thuộc vào fetchProfile

    return { profile, profileLoading, refreshProfile };
};

export default useProfile;
