import { Breadcrumb } from '@/components/breadcrumb';
import BreadcrumbSkeleton from '@/components/skeleton/breadcrumb.skeleton';
import useFetch from '@/hooks/useFetch';
import APIEndpoint from '@/utils/api.endpoint';
import { memo, useMemo } from 'react';

interface VariationBreadcrumbProps {
    id: string;
}

function VariationBreadcrumb({ id }: VariationBreadcrumbProps) {
    const endpoint = useMemo(() => APIEndpoint.productGetByItem(id), [id]);
    const { data, loading, succeeded } = useFetch<Product>(endpoint, null, [endpoint]);

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Product Management',
            link: '/admin/product',
        },
        {
            title: `${data?.name}'s item`,
            link: `/admin/product-item/${data?.id}`,
        },
        {
            title: `Variation Management`,
            link: '/admin/variation',
        },
    ];

    return (
        <>
            {data && succeeded && <Breadcrumb values={breadcrumb} />}
            {loading && <BreadcrumbSkeleton item={3} />}
        </>
    );
}

export default memo(VariationBreadcrumb);
