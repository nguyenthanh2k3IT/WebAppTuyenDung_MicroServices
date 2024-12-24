import { Breadcrumb } from '@/components/breadcrumb';
import BreadcrumbSkeleton from '@/components/skeleton/breadcrumb.skeleton';
import useFetch from '@/hooks/useFetch';
import APIEndpoint from '@/utils/api.endpoint';
import { memo, useMemo } from 'react';

interface ProductItemBreadcrumbProps {
    id: string;
}

function ProductItemBreadcrumb({ id }: ProductItemBreadcrumbProps) {
    const endpoint = useMemo(() => APIEndpoint.productDetail(id), [id]);
    const { data, loading, succeeded } = useFetch<Product>(endpoint, null, [endpoint]);

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Product Management',
            link: '/admin/product',
        },
        {
            title: `${data?.name}'s item`,
            link: '/admin/product-item',
        },
    ];

    return (
        <>
            {data && succeeded && <Breadcrumb values={breadcrumb} />}
            {loading && <BreadcrumbSkeleton item={2} />}
        </>
    );
}

export default memo(ProductItemBreadcrumb);
