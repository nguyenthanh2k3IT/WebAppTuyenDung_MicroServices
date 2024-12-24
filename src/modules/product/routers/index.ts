import { ProductNavigate } from '../navigate';
import MainLayout from '@/layouts/main.layout';
import { ProductPage, ProductDetailPage } from '../pages';

export const ProductRoutes: Route[] = [
    {
        path: ProductNavigate.product.link,
        title: ProductNavigate.product.title,
        page: ProductPage,
        layout: MainLayout,
    },
    {
        path: ProductNavigate.detail.link,
        title: ProductNavigate.detail.title,
        page: ProductDetailPage,
        layout: MainLayout,
    },
];
