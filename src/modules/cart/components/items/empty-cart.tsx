import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HomeNavigate } from '@/modules/home/navigate';

function EmptyCart() {
    return (
        <div className="min-h-[calc(100vh-110px)] flex flex-col items-center justify-center bg-white text-gray-800">
            <ShoppingBag className="w-16 h-16 mb-4 text-gray-400" />
            <h1 className="text-3xl font-bold mb-2">YOUR BAG IS EMPTY</h1>
            <p className="text-gray-600 text-center mb-6 max-w-md font-semibold tracking-wider">
                Items remain in your bag for 60 minutes, and then they're moved to your Saved Items.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded">
                VIEW SAVED ITEMS
            </Button>
            <Link to={HomeNavigate.home.link} className="mt-4 text-gray-600 underline">
                Continue Shopping
            </Link>
        </div>
    );
}

export default EmptyCart;
