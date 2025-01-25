import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function JobManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Job Management',
            link: '/admin/job',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(JobManagementBreadcrumb);