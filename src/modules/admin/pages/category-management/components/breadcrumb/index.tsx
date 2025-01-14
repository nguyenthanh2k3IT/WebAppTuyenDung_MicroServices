import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function CategoryManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Company Management',
            link: '/admin/category',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(CategoryManagementBreadcrumb);