import { Breadcrumb } from '@/components/breadcrumb';
import { memo } from 'react';
import { ProductNavigate } from '../../navigate';
import useParameter from '@/hooks/useParameter';
import '../../styles/index.css';
import { UpdateIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

function ProductPageBreadcrumb() {
    const params = useParameter(['q']);

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: params.q ? `Search results for "${params.q}"` : 'Product',
            link: ProductNavigate.product.link,
        },
    ];

    return (
        <div className="breadcrumb-container product-padding flex justify-between items-center">
            <Breadcrumb values={breadcrumb} />
            <Link to={'/product'} className="flex items-center opacity-80 hover:opacity-100 transition cursor-pointer">
                <span className="tracking-wider">CLEAR</span>
                <UpdateIcon className="ml-1" />
            </Link>
        </div>
    );
}

export default memo(ProductPageBreadcrumb);
