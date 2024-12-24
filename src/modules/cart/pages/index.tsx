import { useState, useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import CartItem from '../components/items/cart-item';
import RecommendedItem from '../components/items/recommended-item';
import Checkout from '../components/items/checkout';
import CheckoutSkeleton from '../components/skeletons/checkout.skeleton';
import RecommendedItemSkeleton from '../components/skeletons/recommended-item.skeleton';
import CartItemSkeleton from '../components/skeletons/cart-item.skeleton';
import CheckoutModal from '../components/modals/checkout.modal';
import useCart from '@/hooks/useCart';
import PageLoading from '@/components/loading/page.loading';
import NotFound from '@/components/error/not-found';

const img1 =
    'https://images.asos-media.com/products/asos-design-essential-muscle-fit-t-shirt-in-grey/206460996-1-highrise';
const img2 =
    'https://images.asos-media.com/products/asos-design-essential-muscle-fit-t-shirt-in-white/203371683-1-white';

function CartPage() {
    const { state, getCart } = useCart();
    const [isSticky, setIsSticky] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const checkoutRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (checkoutRef.current && containerRef.current) {
                const containerTop = containerRef.current.getBoundingClientRect().top - 82;
                const containerBottom = containerRef.current.getBoundingClientRect().bottom;
                const checkoutHeight = checkoutRef.current.offsetHeight;

                if (containerTop <= 0 && containerBottom >= checkoutHeight) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setPageLoading(true);
        getCart();
        setTimeout(() => {
            setPageLoading(false);
        }, 1200);
    }, []);

    return (
        <div className="bg-gray-200 page-container">
            <CheckoutModal />
            <PageLoading loading={pageLoading} />
            {state.cart && state.cart.items.length > 0 && !pageLoading && (
                <div className="container mx-auto px-4 py-8" ref={containerRef}>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold">MY BAG</h1>
                                <span className="text-sm text-gray-500">Items are reserved for 60 minutes</span>
                            </div>
                            <Separator className="bg-gray-300" />
                            <div className="space-y-6 mt-4">
                                {state.loading ? (
                                    <>
                                        <CartItemSkeleton />
                                        <CartItemSkeleton />
                                    </>
                                ) : (
                                    <>
                                        {state.cart.items.map((item, index) => {
                                            return <CartItem item={item} key={index} />;
                                        })}
                                    </>
                                )}
                            </div>

                            <Separator className="bg-gray-300" />

                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">A LITTLE SOMETHING EXTRA?</h2>
                                    <span className="text-sm text-gray-500">16 items</span>
                                </div>
                                <div className="flex space-x-4 overflow-x-auto pb-4">
                                    {state.loading ? (
                                        <>
                                            <RecommendedItemSkeleton />
                                            <RecommendedItemSkeleton />
                                            <RecommendedItemSkeleton />
                                        </>
                                    ) : (
                                        <>
                                            <RecommendedItem image={img1} title="ASOS DESIGN muscle vest in black" />
                                            <RecommendedItem image={img2} title="ASOS DESIGN muscle vest in white" />
                                            <RecommendedItem image={img1} title="COLLUSION ribbed vest in white" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`lg:w-1/3 ${isSticky ? 'lg:sticky lg:top-32 self-start' : ''}`}
                            ref={checkoutRef}
                        >
                            {state.loading ? <CheckoutSkeleton /> : <Checkout />}
                        </div>
                    </div>
                </div>
            )}
            {!state.cart || (state.cart.items.length == 0 && <NotFound to={'/product'} text="Go shopping now :)" />)}
        </div>
    );
}

export default CartPage;
