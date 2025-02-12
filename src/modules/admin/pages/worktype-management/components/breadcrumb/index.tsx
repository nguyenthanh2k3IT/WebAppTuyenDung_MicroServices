import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function WorkTypeManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'WorkType Management',
            link: '/admin/worktype',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(WorkTypeManagementBreadcrumb);
