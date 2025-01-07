import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function ProvinceManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Province Management',
            link: '/admin/province',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(ProvinceManagementBreadcrumb);