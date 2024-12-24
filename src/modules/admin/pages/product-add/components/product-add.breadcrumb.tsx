import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function AddProductBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Product Management',
            link: '/admin/product',
        },
        {
            title: 'Create Product',
            link: '/admin/product/add',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(AddProductBreadcrumb);
