import { HomeRoutes } from '@/modules/home/routers';
import { AuthRoutes } from '@/modules/auth/routers';
import { ProductRoutes } from '@/modules/product/routers';
import { CartRoutes } from '@/modules/cart/routers';
import { WishlistRoutes } from '@/modules/wishlist/routers';
import { AccountRoutes } from '@/modules/account/routers';
import { AdminRoutes } from '@/modules/admin/routers';
import { AlertRoutes } from '@/modules/alert/routers';

export const routes: Route[] = [
    ...HomeRoutes,
    ...AuthRoutes,
    ...ProductRoutes,
    ...CartRoutes,
    ...WishlistRoutes,
    ...AccountRoutes,
    ...AdminRoutes,
    ...AlertRoutes,
];
