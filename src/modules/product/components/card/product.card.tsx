import Currency from '@/components/label/currency.label';
import { Badge } from '@/components/ui/badge';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: ProductOverview;
    className?: string;
    showAttr?: boolean;
}

function ProductCard({ product, className = 'max-w-md', showAttr = true }: ProductCardProps) {
    return (
        <div className={className}>
            <Link to={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt="image"
                    className="max-h-[563px] w-full cursor-pointer hover:scale-105 transition"
                />
            </Link>

            <div className="mt-2">
                <h4 className="tracking-wider opacity-80">{product.name}</h4>
                <div>
                    {product.isSale ? (
                        <div className="flex space-x-2">
                            <h3 className="opacity-80 line-through">
                                <Currency type="euro" />
                                {product.originalPrice}
                            </h3>
                            <h2 className="text-red-500 font-bold">
                                <Currency type="euro" />
                                {product.salePrice}
                            </h2>
                        </div>
                    ) : (
                        <h2 className="font-bold">
                            <Currency type="euro" />
                            {product.originalPrice}
                        </h2>
                    )}
                </div>
                {showAttr && (
                    <div className="space-x-1">
                        <Badge className="bg-white text-black border-gray-400 hover:text-white">{product.brand}</Badge>
                        <Badge className="bg-white text-black border-gray-400 hover:text-white">
                            {product.category}
                        </Badge>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(ProductCard);
