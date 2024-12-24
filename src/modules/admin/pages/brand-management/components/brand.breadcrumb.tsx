import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function BrandBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Brand Management',
            link: '/admin/brand',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(BrandBreadcrumb);
