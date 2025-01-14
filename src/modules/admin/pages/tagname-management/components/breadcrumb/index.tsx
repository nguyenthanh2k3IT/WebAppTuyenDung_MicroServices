import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function TagnameManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Tagname Management',
            link: '/admin/tagname',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(TagnameManagementBreadcrumb);