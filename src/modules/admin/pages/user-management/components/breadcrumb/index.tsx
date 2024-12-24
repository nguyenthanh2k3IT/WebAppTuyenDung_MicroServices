import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function UserManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'User Management',
            link: '/admin/user',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(UserManagementBreadcrumb);
