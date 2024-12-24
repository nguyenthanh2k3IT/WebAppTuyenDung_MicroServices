import useProfile from '@/hooks/useProfile';
import { Navigate, Outlet } from 'react-router-dom';
import PageLoading from '@/components/loading/page.loading';
import { AdminNavigate } from '@/modules/admin/navigate';
import { getToken } from '@/helpers/storage.helper';
import { RoleType } from '@/enums/entity-type.enum';

const AdminMiddleware = () => {
    if (!getToken()) {
        return <Navigate to={AdminNavigate.login.link} />;
    }

    const { profile, profileLoading } = useProfile();

    if (profileLoading) {
        return <PageLoading />;
    }

    if (!profile) {
        return <Navigate to={AdminNavigate.login.link} />;
    }

    if (profile.roleId !== RoleType.ADMIN) {
        return <Navigate to={AdminNavigate.login.link} />;
    }

    return <Outlet />;
};

export default AdminMiddleware;
