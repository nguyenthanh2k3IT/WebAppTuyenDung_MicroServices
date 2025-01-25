import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function ExperienceManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Experience Management',
            link: '/admin/experience',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(ExperienceManagementBreadcrumb);
