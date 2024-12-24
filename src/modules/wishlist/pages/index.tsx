import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ExpandableList from '@/components/list/expandable.list';
import useExpandableListRef from '@/hooks/useExpandableListRef';
import Empty from '@/assets/images/empty.jpg';
import Currency from '@/components/label/currency.label';

function WishlistPage() {
    const [sortBy, setSortBy] = useState('recently-added');
    const { listRef, handleRemove } = useExpandableListRef();

    const ProductContent = (item: Product) => {
        return (
            <Card key={item.id} className="relative group">
                <CardContent className="p-4">
                    <div className="absolute top-2 right-2 p-2 bg-white rounded-full cursor-pointer z-10">
                        <Trash2
                            size={20}
                            className="text-gray-400 group-hover:text-red-500 transition-colors"
                            onClick={() => handleRemove(item.id)}
                        />
                    </div>
                    <Link
                        to={`/product/${item.slug}`}
                        className="block aspect-w-3 aspect-h-4 mb-4 cursor-pointer overflow-hidden"
                    >
                        <img
                            src={item.image ?? Empty}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                    <div className="relative z-10 bg-white">
                        <h3 className="text-sm tracking-wider mb-2 line-clamp-2 pt-2">{item.name}</h3>
                        <div className="flex justify-between items-center">
                            <span className="font-bold">
                                {item.salePrice}
                                <Currency type="euro" />
                            </span>

                            {item.originalPrice && (
                                <span className="text-sm line-through text-gray-500">
                                    {item.originalPrice}
                                    <Currency type="euro" />
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="bg-white page-container">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Saved Items</h1>
                <div className="flex justify-between items-center mb-6">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recently-added">Recently added</SelectItem>
                            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ExpandableList
                    contentStyle="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    ref={listRef}
                    api="/catalog-service/api/Wishlist/filter"
                    content={ProductContent}
                    totalRecord={8}
                />
            </div>
        </div>
    );
}

export default WishlistPage;
