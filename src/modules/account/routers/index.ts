import { AccountNavigate } from '../navigate';
import AccountLayout from '../layouts';
import { MyDetailPage, MyPasswordPage, MyOrderPage, PointHistoryPage } from '../pages';
import AuthMiddleware from '@/middlewares/auth.middleware';

export const AccountRoutes: Route[] = [
    {
        path: AccountNavigate.detail.link,
        title: AccountNavigate.detail.title,
        page: MyDetailPage,
        layout: AccountLayout,
        middleware: AuthMiddleware,
    },
    {
        path: AccountNavigate.password.link,
        title: AccountNavigate.password.title,
        page: MyPasswordPage,
        layout: AccountLayout,
        middleware: AuthMiddleware,
    },
    {
        path: AccountNavigate.order.link,
        title: AccountNavigate.order.title,
        page: MyOrderPage,
        layout: AccountLayout,
        middleware: AuthMiddleware,
    },
    {
        path: AccountNavigate.pointHistory.link,
        title: AccountNavigate.pointHistory.title,
        page: PointHistoryPage,
        layout: AccountLayout,
        middleware: AuthMiddleware,
    },
];
