import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function GenderManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Gender Management',
            link: '/admin/gender',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(GenderManagementBreadcrumb);