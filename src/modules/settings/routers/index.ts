import MainLayout from '@/layouts/main.layout';
import SettingPage from '../pages';

export const SettingRoutes: Route[] = [
    {
        path: '/settings',
        title: 'Cài đặt',
        page: SettingPage,
        layout: MainLayout,
    },
];
