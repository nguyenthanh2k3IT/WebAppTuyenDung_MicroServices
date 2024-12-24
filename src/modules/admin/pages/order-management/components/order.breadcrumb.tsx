import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function OrderBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Order Management',
            link: '/admin/order',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(OrderBreadcrumb);
