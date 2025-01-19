import { HomeRoutes } from '@/modules/home/routers';
import { AuthRoutes } from '@/modules/auth/routers';
import { AdminRoutes } from '@/modules/admin/routers';
import { SettingRoutes } from '@/modules/settings/routers';
import { JobRoutes } from '@/modules/job/routers';

export const routes: Route[] = [...HomeRoutes, ...JobRoutes, ...SettingRoutes, ...AuthRoutes, ...AdminRoutes];
