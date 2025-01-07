import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function CompanyManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Company Management',
            link: '/admin/company',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(CompanyManagementBreadcrumb);