import AuthLayout from '@/modules/auth/layout/auth.layout';
import AdminLayout from '../layout/index';
import { AdminNavigate } from '../navigate';
import { AdminLogin, Dashboard, UserManagement } from '../pages';
//import AdminMiddleware from '@/middlewares/admin.middleware';

export const AdminRoutes: Route[] = [
    {
        path: AdminNavigate.login.link,
        title: AdminNavigate.login.title,
        page: AdminLogin,
        layout: AuthLayout,
    },
    {
        path: AdminNavigate.user.link,
        title: AdminNavigate.user.title,
        page: UserManagement,
        layout: AdminLayout,
        // middleware: AdminMiddleware,
    },
    {
        path: AdminNavigate.dashboard.link,
        title: AdminNavigate.dashboard.title,
        page: Dashboard,
        layout: AdminLayout,
        // middleware: AdminMiddleware,
    },
];
