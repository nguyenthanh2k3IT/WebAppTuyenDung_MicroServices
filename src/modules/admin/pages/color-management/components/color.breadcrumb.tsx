import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

function ColorBreadcrumb() {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Color Management',
            link: '/admin/color',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(ColorBreadcrumb);
