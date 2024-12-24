import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
import { ProductNavigate } from '../../navigate';
import '../../styles/index.css';
import useProductFilter from '@/hooks/useProductFilter';

interface ProductDetailBreadcrumbProps {
    name: string;
}

function ProductDetailBreadcrumb({ name }: ProductDetailBreadcrumbProps) {
    const { filter } = useProductFilter();

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: filter.textSearch ? `Search results for "${filter.textSearch}"` : 'Product',
            link: `/product?q=${filter.textSearch}`,
        },
        {
            title: name,
            link: ProductNavigate.product.link,
        },
    ];

    return (
        <div className="breadcrumb-container product-padding">
            <Breadcrumb values={breadcrumb} />
        </div>
    );
}

export default memo(ProductDetailBreadcrumb);
