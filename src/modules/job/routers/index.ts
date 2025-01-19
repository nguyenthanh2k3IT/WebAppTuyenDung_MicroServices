import MainLayout from '@/layouts/main.layout';
import JobPage from '../pages/list';

export const JobRoutes: Route[] = [
    {
        path: '/viec-lam',
        title: 'Việc làm',
        page: JobPage,
        layout: MainLayout,
    },
];
