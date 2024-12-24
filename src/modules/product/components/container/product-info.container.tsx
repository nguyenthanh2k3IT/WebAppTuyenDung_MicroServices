import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import SingleSelect from '@/components/select/index';
import WishlistService from '../../services/wishlist.service';
import useProfile from '@/hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import useCart from '@/hooks/useCart';

interface ProductInformationProps {
    product?: ProductDetail;
    loading: boolean;
}

function ProductInformation({ product, loading }: ProductInformationProps) {
    const { addProduct } = useCart();
    const { profile } = useProfile();
    const [item, setItem] = useState<ProductItemDetail>();
    const [url, setUrl] = useState<string>();
    const [colorToggle, setColorToggle] = useState<ProductItemDetail | null>(null);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [variation, setVariation] = useState<string>();
    const [wishlist, setWishlist] = useState<boolean>(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const transformVariation = (data: VariationDetail[]): SelectOption[] => {
        const transfer: SelectOption[] = data.map((item) => {
            const price: number = product ? (product?.isSale ? product.salePrice : product?.originalPrice) : 0;
            const additionalPrice: number = colorToggle?.additionalPrice || 0;
            const totalPrice = (price + additionalPrice + item.stock).toFixed(2);
            const tmp: SelectOption = {
                value: item.id,
                label: `${item.size}- £${totalPrice}`,
            };
            return tmp;
        });
        return transfer;
    };

    useEffect(() => {
        if (product) {
            setWishlist(product.action.addWishlist);
            setItem(product.items[0]);
            setUrl(product.items[0].images[0]);
            setColorToggle(product.items[0]);
            if (product.items[0].variations && product.items[0].variations.length > 0) {
                const transfer = transformVariation(product.items[0].variations);
                setOptions(transfer || []);
                setVariation(transfer ? transfer[0].value : '');
            }
        }
    }, [product]);

    const changeColorToggle = (selected: ProductItemDetail) => {
        setItem(selected);
        setUrl(selected.images[0]);
        setColorToggle(selected);
        if (selected.variations && selected.variations.length > 0) {
            const transfer = transformVariation(selected.variations);
            setOptions(transfer || []);
            setVariation(transfer ? transfer[0].value ?? '' : '');
        } else {
            setOptions([]);
            setVariation('');
        }
    };

    const changeVariation = (option: SelectOption) => {
        setVariation(option.value);
    };

    const handleChangeWishlist = async () => {
        if (!product) return;

        if (!profile) navigate('/auth/login');

        if (wishlist) {
            const res = await WishlistService.delete(product?.id);
            if (res) {
                setWishlist(false);
            }
        } else {
            const res = await WishlistService.add(product?.id);
            if (res) {
                toast({
                    variant: 'success',
                    title: 'Action alert',
                    description: 'Add product to wishlist successfully',
                    duration: 1500,
                });
                setWishlist(true);
            }
        }
    };

    const handleAddProductToCart = () => {
        if (!variation) {
            toast({
                variant: 'destructive',
                title: 'Action alert',
                description: 'Please choose size',
                duration: 1500,
            });
            return;
        }
        if (!profile) {
            navigate('/auth/login');
            return;
        }
        addProduct(variation);
    };

    return (
        <div className="grid grid-cols-6 h-auto">
            <div className="col-span-4 w-full grid grid-cols-10">
                <div className=" h-full col-span-1 px-2">
                    {loading &&
                        Array(4)
                            .fill(null)
                            .map((_, index) => <Skeleton key={index} className="w-11 h-14 mb-2" />)}

                    {item?.images.map((item, index) => {
                        return (
                            <img
                                onClick={() => setUrl(item)}
                                src={item}
                                key={index}
                                alt="img"
                                className={`${
                                    url === item ? 'border-4 border-blue-400' : ''
                                } mb-2 cursor-pointer hover:scale-105 transition`}
                            />
                        );
                    })}
                </div>
                <div className=" h-full col-span-9 px-8">
                    {(loading || !url) && <Skeleton className="w-[473px] h-[600px]" />}
                    {url && <img src={url} alt="img" className="w-full" />}
                </div>
            </div>
            <div className="col-span-2 w-full py-2 tracking-wider">
                {loading && <Skeleton className="w-56 h-6" />}
                <h2 className="text-gray-700 text-xl">{product?.name}</h2>
                <div className="flex items-center space-x-2 mt-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-5 w-5 ${
                                i < (product?.averageRating ?? 0) ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            fill={i < (product?.averageRating ?? 0) ? 'currentColor' : 'none'}
                        />
                    ))}
                    <span className="text-gray-700 text-sm">({product?.averageRating ?? 0})</span>
                    <span className="text-gray-500 text-sm">(43 Reviews)</span>
                </div>
                {loading && <Skeleton className="w-20 h-6 mt-2" />}

                {product && (
                    <h1 className="text-red-600 font-bold mt-2">
                        Now £{product?.isSale ? product.salePrice : product?.originalPrice}
                    </h1>
                )}
                {product?.isSale && <h4 className="opacity-80 text-xs mt-1 ">Was £{product.originalPrice}</h4>}
                <div className="px-4 py-2 bg-blue-100 my-4">
                    <p>Extra 15% off black friday! </p>
                    <p>
                        use code: <strong>GET15</strong>
                    </p>
                </div>
                <div className="mb-2">
                    <h3 className="font-bold mb-1">Colour:</h3>
                    {loading &&
                        Array(4)
                            .fill(null)
                            .map((_, index) => <Skeleton key={index} className="w-12 h-7 mb-2 mr-2 inline-block" />)}
                    {!loading &&
                        product?.items.map((item, index) => {
                            return (
                                <div
                                    onClick={() => changeColorToggle(item)} // Update the state when item is clicked
                                    key={index}
                                    className={`${
                                        colorToggle && colorToggle.id === item.id ? 'bg-black text-white' : ''
                                    } mr-2 mb-2 border-2 border-black inline-block px-1 hover:bg-black hover:text-white cursor-pointer transition`}
                                >
                                    {item.color}
                                </div>
                            );
                        })}
                </div>
                {options.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-bold mb-1">Size:</h3>
                        <SingleSelect
                            defaultValue={variation}
                            triggerStyle="w-full border-2 border-gray-600"
                            placeHolder="Please select ..."
                            options={options}
                            onChange={(option) => changeVariation(option)}
                        />
                    </div>
                )}
                <div className="flex items-center mb-4">
                    <Button
                        onClick={handleAddProductToCart}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 transition w-[90%] mr-1"
                    >
                        ADD TO BAG
                    </Button>
                    <div
                        className={`hover:opacity-80 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition ${
                            wishlist ? 'bg-red-500 text-white' : ' bg-gray-200 '
                        }`}
                    >
                        <Heart onClick={handleChangeWishlist} />
                    </div>
                </div>
                <div className="border-2 border-gray-500 rounded px-2 py-2 text-justify">
                    Thank You for Shopping with ASOS! We truly appreciate your support and trust in ASOS for your
                    fashion needs. Your style inspires us, and we're thrilled to be part of your journey.
                </div>
            </div>
        </div>
    );
}

export default ProductInformation;
