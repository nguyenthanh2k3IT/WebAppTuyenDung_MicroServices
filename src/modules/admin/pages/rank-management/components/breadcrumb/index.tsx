import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
function RankManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Rank Management',
            link: '/admin/rank',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(RankManagementBreadcrumb);