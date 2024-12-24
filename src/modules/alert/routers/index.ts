import CheckoutSuccessPage from '../pages/checkout-success.page';
import MainLayout from '@/layouts/main.layout';
import AuthMiddleware from '@/middlewares/auth.middleware';
import CheckoutFailurePage from '../pages/checkout-failure.page';

export const AlertRoutes: Route[] = [
    {
        path: '/checkout/success',
        title: 'Order checkout',
        page: CheckoutSuccessPage,
        layout: MainLayout,
        middleware: AuthMiddleware,
    },
    {
        path: '/checkout/failure',
        title: 'Order checkout',
        page: CheckoutFailurePage,
        layout: MainLayout,
        middleware: AuthMiddleware,
    },
];
