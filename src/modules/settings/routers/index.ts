import MainLayout from '@/layouts/main.layout';
import SettingPage from '../pages';

export const SettingRoutes: Route[] = [
    {
        path: '/cai-dat',
        title: 'Cài đặt',
        page: SettingPage,
        layout: MainLayout,
    },
];
