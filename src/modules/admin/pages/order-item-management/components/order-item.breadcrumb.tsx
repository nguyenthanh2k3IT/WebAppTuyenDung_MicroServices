import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function OrderItemBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Order Management',
            link: '/admin/order',
        },
        {
            title: 'View Detail Item',
            link: '/admin/order',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(OrderItemBreadcrumb);
