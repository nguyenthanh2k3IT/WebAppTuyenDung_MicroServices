import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function ProductBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Product Management',
            link: '/admin/product',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(ProductBreadcrumb);
