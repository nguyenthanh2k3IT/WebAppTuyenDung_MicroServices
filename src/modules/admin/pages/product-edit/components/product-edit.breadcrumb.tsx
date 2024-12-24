import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';

type EditProductBreadcrumbProps = {
    name?: string | null | undefined;
};

function EditProductBreadcrumb({ name }: EditProductBreadcrumbProps) {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Product Management',
            link: '/admin/product',
        },
        {
            title: `Edit ${name}`,
            link: '/admin/product/add',
        },
    ];
    return <Breadcrumb values={breadcrumb} />;
}

export default memo(EditProductBreadcrumb);
