import MainLayout from '@/layouts/main.layout';
import JobPage from '../pages/list';
import JobDetailPage from '../pages/detail';

export const JobRoutes: Route[] = [
    {
        path: '/viec-lam',
        title: 'Việc làm',
        page: JobPage,
        layout: MainLayout,
    },
    {
        path: '/viec-lam/:id',
        title: 'Việc làm',
        page: JobDetailPage,
        layout: MainLayout,
    },
];
