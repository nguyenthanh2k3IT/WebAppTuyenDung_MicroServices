import { HomeRoutes } from '@/modules/home/routers';
import { AuthRoutes } from '@/modules/auth/routers';
import { AdminRoutes } from '@/modules/admin/routers';

export const routes: Route[] = [...HomeRoutes, ...AuthRoutes, ...AdminRoutes];
