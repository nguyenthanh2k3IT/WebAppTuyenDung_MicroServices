import { useLocation, useParams } from 'react-router-dom';
import ProductDetailBreadcrumb from '../components/breadcrumb/product-detail.breadcrumb';
import NotFound from '@/components/error/not-found';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import SimilarProduct from '../components/container/product-similar';
import ProductComment from '../components/container/product-comment';
import ProductService from '../services/product.service';
import ProductAccordition from '../components/container/product-accordition';
import ProductInformation from '../components/container/product-info.container';
import '../styles/index.css';
import ProductRatings from '../components/container/product-rating';
import CommentSheet from '../components/sheet/comment.sheet';
import RatingModal from '../components/modal/rating.modal';

function ProductDetailPage() {
    const { slug } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProducts] = useState<ProductDetail>();

    if (!slug) {
        return (
            <div className="pb-10">
                <NotFound to="/product" />
            </div>
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        const getProductAPI = async () => {
            setLoading(true);
            const res = await ProductService.getFullInfo(slug);
            setTimeout(() => {
                if (res) {
                    setProducts(res);
                }
                setLoading(false);
            }, 1200);
        };

        getProductAPI();
    }, [slug]);

    return (
        <div className="product-container">
            <CommentSheet />
            <RatingModal />
            {!loading && product && <ProductDetailBreadcrumb name={product.name} />}
            {loading && (
                <div className="breadcrumb-container product-padding">
                    <Skeleton className="w-80 h-6" />
                </div>
            )}
            <div className="max-w-4xl mx-auto min-h-screen pt-2">
                <ProductInformation product={product} loading={loading} />
                <Separator className="bg-gray-300 mt-10" />
                <ProductAccordition description={product?.description} sizeAndFit={product?.sizeAndFit} />
                <div className="mt-10">
                    <SimilarProduct />
                </div>
                <Separator className="bg-gray-300 mt-10" />
                {product && product.id && (
                    <div className="my-10">
                        <h2 className="tracking-wider font-bold">PRODUCT REVIEWS</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <ProductRatings
                                id={product.id}
                                rated={product.action.pointRated || 0}
                                avgRating={product.averageRating || 0}
                            />
                            <ProductComment id={product.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetailPage;
