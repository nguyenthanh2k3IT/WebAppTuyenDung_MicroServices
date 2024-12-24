import { Fragment, useEffect, useState } from 'react';
import ProductService from '../../services/product.service';
import ProductCard from '../card/product.card';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';

function SimilarProduct() {
    const { slug } = useParams();
    const [products, setProducts] = useState<ProductOverview[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await ProductService.getSimilarOverview(slug!, 8);
            if (res) {
                setProducts(res);
            }
            setLoading(false);
        };

        if (slug) fetchData();
    }, [slug]);

    return (
        <Fragment>
            <h2 className="tracking-wider font-bold">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-4 gap-6 mt-4">
                {loading &&
                    Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} className="max-w-md h-[20rem]" />
                    ))}
                {products.map((item, index) => {
                    return <ProductCard key={index} product={item} showAttr={false} />;
                })}
            </div>
        </Fragment>
    );
}

export default SimilarProduct;
