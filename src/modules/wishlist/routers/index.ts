import MainLayout from '@/layouts/main.layout';
import WishlistPage from '../pages';
import { WishlistNavigate } from '../navigate';
import AuthMiddleware from '@/middlewares/auth.middleware';

export const WishlistRoutes: Route[] = [
    {
        path: WishlistNavigate.wishlist.link,
        title: WishlistNavigate.wishlist.title,
        page: WishlistPage,
        layout: MainLayout,
        middleware: AuthMiddleware,
    },
];
