import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function PostManagementBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Post Management',
            link: '/admin/posts',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(PostManagementBreadcrumb);