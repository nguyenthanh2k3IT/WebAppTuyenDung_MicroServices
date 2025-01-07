import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function SizeManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Size Management',
            link: '/admin/size',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(SizeManagementBreadcrumb);