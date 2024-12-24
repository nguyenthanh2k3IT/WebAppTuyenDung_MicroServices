import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function DiscountBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Discount Management',
            link: '/admin/discount',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(DiscountBreadcrumb);
