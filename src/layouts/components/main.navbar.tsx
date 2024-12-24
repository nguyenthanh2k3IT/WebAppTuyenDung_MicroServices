import Flex from '@/components/container/flex.container';
import logo from '../../assets/svg/asos-logo.svg';
import '../styles/main.navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeNavigate } from '@/modules/home/navigate';
import SearchInput from '@/components/search';
import { useState, useRef, useEffect, Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { User, Heart, ShoppingBag, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AuthNavigate } from '@/modules/auth/navigate';
import { AccountNavigate } from '@/modules/account/navigate';
import { WishlistNavigate } from '@/modules/wishlist/navigate';
import { CartNavigate } from '@/modules/cart/navigate';
import useProfile from '@/hooks/useProfile';
import useCaller from '@/hooks/useCaller';
import { removeTokens } from '@/helpers/storage.helper';
import useProductFilter from '@/hooks/useProductFilter';
import { ProductFilterState } from '@/redux/slicers/product-filter.slice';
import useFetch from '@/hooks/useFetch';
import { cn } from '@/lib/utils';
import { CaretDownIcon } from '@radix-ui/react-icons';
import NotificationPopover from '@/modules/admin/layout/components/notification.popover';

function MainNavbar() {
    const { data: genders, loading } = useFetch<GenderMenu[]>('/catalog-service/api/Gender/menu', []);
    const [categories, setCategories] = useState<CategoryInGender[] | null>(null);
    const [subCategories, setSubCategories] = useState<CategoryInGender[] | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const { filter, searchOutsideProductPage, createParams } = useProductFilter();
    const location = useLocation();
    const navigate = useNavigate();
    const { callApi } = useCaller<boolean>();
    const { profile } = useProfile();
    const [search, setSearch] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSubCategory, setIsOpenSubCategory] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
    };

    const handleLogout = async () => {
        const result = await callApi(
            '/identity-service/api/Auth/logout',
            {
                method: 'POST',
            },
            'Logout Successfully',
        );

        if (result.data && result.data === true) {
            setTimeout(() => {
                removeTokens();
                window.location.href = '/';
            }, 1500);
        }
    };

    useEffect(() => {
        if (genders && genders.length > 0) {
            setSelected(genders[0].slug);
            setCategories(genders[0].categories);
        }
    }, [genders]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const currentPath = location.pathname;
            if (!currentPath.includes('product')) {
                searchOutsideProductPage(search);
                navigate(`/product?q=${search}`);
            } else {
                const option: ProductFilterState = {
                    pageIndex: filter.pageIndex,
                    pageSize: filter.pageSize,
                    textSearch: search,
                };
                const params = createParams(option);
                navigate(`/product?${params}`);
            }
        }
    };

    const switchGender = (item: GenderMenu) => {
        setSelected(item.slug);
        setCategories(item.categories);
        onHideSubCategory();
    };

    const onShowSubCategory = (item: CategoryInGender[]) => {
        setSubCategories(item);
        setIsOpenSubCategory(true);
    };

    const onHideSubCategory = (): void => {
        setSubCategories(null);
        setIsOpenSubCategory(true);
    };

    const onNavigate = (item: string) => {
        const url = `/product?gender=${selected}&category=${item}`;
        navigate(url);
    };

    return (
        <div className=" w-full sticky top-0 z-20">
            <Flex className="bg-[#2D2D2D] h-[60px] w-full text-white px-9 text-lg" justify="center">
                <Flex items="center" className="h-full">
                    <Link to={HomeNavigate.home.link} className="w-28">
                        <img src={logo} alt="logo" className="text-white" style={{ filter: 'invert(1)' }} />
                    </Link>
                    {loading && (
                        <Fragment>
                            <div className="gender transition w-28">Women</div>
                            <div className="gender transition w-28">Men</div>
                        </Fragment>
                    )}
                    {genders?.map((item, index) => {
                        return (
                            <div
                                onClick={() => switchGender(item)}
                                key={index}
                                className={cn('gender transition w-28', selected === item.slug ? 'bg-[#525050]' : '')}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </Flex>
                <Separator orientation="vertical" style={{ background: 'gray' }} />
                <div className="py-3 w-[835px] pl-8 pr-4">
                    <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
                <Separator orientation="vertical" style={{ background: 'gray' }} />
                <Flex items="center">
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                            <div
                                className="action-icon"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <User className="text-white hover:scale-125 transition cursor-pointer" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-56 p-0"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex justify-between items-center p-2 border-b">
                                {profile ? (
                                    <div className="flex items-center">
                                        <span className="font-bold">{profile.fullname}</span>
                                        <Separator orientation="vertical" className="w-[0.1rem] h-4 bg-gray-400 mx-1" />
                                        <span
                                            className="text-sm font-semibold opacity-80 hover:opacity-100 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <Link to={AuthNavigate.login.link} className="text-sm font-semibold">
                                            Sign In
                                        </Link>
                                        {' | '}
                                        <Link to={AuthNavigate.register.link} className="text-sm font-semibold">
                                            Join
                                        </Link>
                                    </div>
                                )}
                                <X className="h-4 w-4 cursor-pointer" onClick={() => setIsOpen(false)} />
                            </div>
                            <div className="py-2">
                                <Link
                                    to={AccountNavigate.detail.link}
                                    className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    My Account
                                </Link>
                                <Link
                                    to={AccountNavigate.order.link}
                                    className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    My Orders
                                </Link>
                                {profile && (
                                    <Link
                                        to={WishlistNavigate.wishlist.link}
                                        className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <Heart className="mr-2 h-4 w-4" />
                                        My Wishlists
                                    </Link>
                                )}
                                <Link
                                    to="/contact-preferences"
                                    className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <span className="mr-2">💬</span>
                                    Contact Preferences
                                </Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {profile ? (
                        <div className="action-icon">
                            <NotificationPopover>
                                <Bell className=" text-white hover:scale-125 transition" />
                            </NotificationPopover>
                        </div>
                    ) : (
                        <div className="action-icon">
                            <Link to={WishlistNavigate.wishlist.link}>
                                <Heart className=" text-white hover:scale-125 transition" />
                            </Link>
                        </div>
                    )}
                    <div className="action-icon">
                        <Link to={CartNavigate.cart.link}>
                            <ShoppingBag className=" text-white hover:scale-125 transition" />
                        </Link>
                    </div>
                </Flex>
            </Flex>
            {selected && (
                <div className="w-full bg-[#525050] h-[50px]">
                    <Flex className="max-w-[1450px] mx-auto px-11 h-full">
                        {categories?.map((item, key) => {
                            return (
                                <Button
                                    onClick={() => onNavigate(item.slug)}
                                    onMouseEnter={() => onShowSubCategory(item.children)}
                                    key={key}
                                    className="tracking-wider text-lg !font-normal text-white !rounded-none shadow-none h-full px-3 bg-transparent hover:bg-[#EEEEEE] hover:text-black"
                                >
                                    {item.name}
                                    {item.children && item.children.length > 0 && (
                                        <CaretDownIcon className="ml-[2px]" />
                                    )}
                                </Button>
                            );
                        })}
                    </Flex>
                </div>
            )}
            {isOpenSubCategory && selected && subCategories && subCategories.length > 0 && (
                <div className="w-full bg-[#EEEEEE] h-[50px] " onMouseLeave={onHideSubCategory}>
                    <Flex className="max-w-[1450px] mx-auto px-11 h-full">
                        {subCategories?.map((item, key) => {
                            return (
                                <Button
                                    onClick={() => onNavigate(item.slug)}
                                    key={key}
                                    className="tracking-wider text-lg !font-normal text-black !rounded-none shadow-none h-full px-3 bg-transparent hover:bg-[#e0dfdf] hover:text-black"
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </Flex>
                </div>
            )}
        </div>
    );
}

export default MainNavbar;
