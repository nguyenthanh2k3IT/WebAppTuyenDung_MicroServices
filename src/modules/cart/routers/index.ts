import MainLayout from '@/layouts/main.layout';
import CartPage from '../pages';
import { CartNavigate } from '../navigate';
import AuthMiddleware from '@/middlewares/auth.middleware';

export const CartRoutes: Route[] = [
    {
        path: CartNavigate.cart.link,
        title: CartNavigate.cart.title,
        page: CartPage,
        layout: MainLayout,
        middleware: AuthMiddleware,
    },
];
