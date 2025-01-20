import AuthLayout from '@/modules/auth/layout/auth.layout';
import AdminLayout from '../layout/index';
import { AdminNavigate } from '../navigate';
import { AdminLogin, Dashboard, UserManagement, ProvinceManagement, SizeManagement, CompanyManagement, CategoryManagement, TagnameManagement, PostManagement } from '../pages';
import PostPreview from '../pages/post-management/PostPreview';
import PostCreate from '../pages/post-management/PostCreate';
import PostUpdate from '../pages/post-management/PostUpdate';
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
    {
        path: AdminNavigate.province.link,
        title: AdminNavigate.province.title,
        page: ProvinceManagement,
        layout: AdminLayout,
        // middleware: AdminMiddleware,
    },
    {
        path: AdminNavigate.size.link,
        title: AdminNavigate.size.title,
        page: SizeManagement,
        layout: AdminLayout,
        // middleware: AdminMiddleware
    },
    {
        path: AdminNavigate.company.link,
        title: AdminNavigate.company.title,
        page: CompanyManagement,
        layout: AdminLayout,
        // middleware: AdminMiddleware
    },
    {
        path: AdminNavigate.category.link,
        title: AdminNavigate.category.title,
        page: CategoryManagement,
        layout: AdminLayout,
    },
    {
        path: AdminNavigate.tagname.link,
        title: AdminNavigate.tagname.title,
        page: TagnameManagement,
        layout: AdminLayout,
    },
    {
        path: AdminNavigate.post.link,
        title: AdminNavigate.post.title,
        page: PostManagement,
        layout: AdminLayout,
    },
    {
        path: `${AdminNavigate.post.link}/preview`,
        title: 'Xem bài viết',
        page: PostPreview,
        layout: AdminLayout,
    },
    {
        path: `${AdminNavigate.post.link}/create`,
        title: 'Tạo bài viết',
        page: PostCreate,
        layout: AdminLayout,
    },
    {
        path: `${AdminNavigate.post.link}/update`,
        title: 'Cập nhật bài viết',
        page: PostUpdate,
        layout: AdminLayout,
    },
];