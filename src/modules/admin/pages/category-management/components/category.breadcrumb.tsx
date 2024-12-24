import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function CategoryBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Category Management',
            link: '/admin/category',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(CategoryBreadcrumb);
