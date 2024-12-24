import MainLayout from '@/layouts/main.layout';
import HomePage from '../pages';
import { HomeNavigate } from '../navigate';

export const HomeRoutes: Route[] = [
    {
        path: HomeNavigate.home.link,
        title: HomeNavigate.home.title,
        page: HomePage,
        layout: MainLayout,
    },
];
