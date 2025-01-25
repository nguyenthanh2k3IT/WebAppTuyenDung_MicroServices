import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function JobCategoryManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Job Category Management',
            link: '/admin/job/category',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(JobCategoryManagementBreadcrumb);