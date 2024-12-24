import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

interface CategoryDetailBreadcrumbProps {
    name: string;
}

function CategoryDetailBreadcrumb({ name }: CategoryDetailBreadcrumbProps) {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Category Management',
            link: '/admin/category',
        },
        {
            title: name,
            link: '/admin/category/detail',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(CategoryDetailBreadcrumb);
