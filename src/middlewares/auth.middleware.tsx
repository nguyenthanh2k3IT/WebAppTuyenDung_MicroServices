import PageLoading from '@/components/loading/page.loading';
import { getToken } from '@/helpers/storage.helper';
import useProfile from '@/hooks/useProfile';
import { AuthNavigate } from '@/modules/auth/navigate';
import { Navigate, Outlet } from 'react-router-dom';

const AuthMiddleware = () => {
    if (!getToken()) {
        return <Navigate to={AuthNavigate.login.link} />;
    }

    const { profile, profileLoading } = useProfile();

    if (profileLoading) {
        return <PageLoading />;
    }

    if (!profile) {
        return <Navigate to={AuthNavigate.login.link} />;
    }

    return <Outlet />;
};

export default AuthMiddleware;
