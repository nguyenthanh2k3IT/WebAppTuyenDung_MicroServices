import { Input } from '@/components/ui/input';
import useCart from '@/hooks/useCart';
import { X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemProps {
    item: CartItem;
}

function CartItem({ item }: CartItemProps) {
    const { removeProduct, increaseQuantity, decreaseQuantity } = useCart();

    const handleChangeQuantity = (value: string) => {
        const number: number = Number(value);
        if (number === item.quantity + 1) {
            increaseQuantity(item.variationId);
        } else if (number === item.quantity - 1) {
            decreaseQuantity(item.variationId);
        }
    };

    return (
        <div className="flex items-start pb-6 border-b">
            <Link to={`/product/${item.slug}`}>
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover mr-4" />
            </Link>
            <div className="flex-grow">
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-lg">
                            £{item.isSale ? item.totalSalePrice : item.totalPrice}{' '}
                            {item.isSale && (
                                <span className="line-through text-gray-500 text-sm ml-2">£{item.totalPrice}</span>
                            )}
                        </p>
                        <h3 className="text-sm text-gray-600 mb-1">{item.name}</h3>
                        {true && (
                            <span className="bg-slate-500 text-white font-semibold tracking-wider text-xs px-2 py-1 rounded">
                                SELLING FAST
                            </span>
                        )}
                    </div>
                    <X className="cursor-pointer" onClick={() => removeProduct(item.variationId)} />
                </div>
                <div className="mt-2 flex items-center space-x-4">
                    <div className="flex flex-row items-center space-x-2 text-sm font-semibold">
                        <span className=" text-gray-500 uppercase">{item.color}</span>
                        <span className="uppercase">XS</span>
                        <div className="flex items-center">
                            <span className="mr-1 uppercase">Qty</span>
                            <Input
                                value={item.quantity}
                                onChange={(e) => handleChangeQuantity(e.target.value)}
                                min={0}
                                type="number"
                                className="h-8 w-14 border-gray-300 focus:ring-blue-500 rounded-none"
                            />
                        </div>
                    </div>
                </div>
                <button className="flex items-center text-sm mt-2 text-gray-500">
                    <Heart size={16} className="mr-1" /> Save for later
                </button>
            </div>
        </div>
    );
}

export default CartItem;
