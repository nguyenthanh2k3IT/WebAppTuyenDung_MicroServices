import Flex from '@/components/container/flex.container';
import logo from '../../assets/svg/asos-logo.svg';
import '../styles/main.navbar.css';
import { Link } from 'react-router-dom';
import { HomeNavigate } from '@/modules/home/navigate';
import SearchInput from '@/components/search';
import { useState, useRef, useEffect, Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { User, Heart, ShoppingBag, X, Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AuthNavigate } from '@/modules/auth/navigate';
import useProfile from '@/hooks/useProfile';
import useCaller from '@/hooks/useCaller';
import { removeTokens } from '@/helpers/storage.helper';
import NotificationPopover from '@/modules/admin/layout/components/notification.popover';

function MainNavbar() {
    const { callApi } = useCaller<boolean>();
    const { profile } = useProfile();
    const [search, setSearch] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
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
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className=" w-full sticky top-0 z-20">
            <Flex className="bg-[#2D2D2D] h-[60px] w-full text-white px-9 text-lg" justify="center">
                <Flex items="center" className="h-full">
                    <Link to={HomeNavigate.home.link} className="w-28">
                        <img src={logo} alt="logo" className="text-white" style={{ filter: 'invert(1)' }} />
                    </Link>
                    <Fragment>
                        <div className="gender transition w-28">Women</div>
                        <div className="gender transition w-28">Men</div>
                    </Fragment>
                </Flex>
                <Separator orientation="vertical" style={{ background: 'gray' }} />
                <div className="py-3 w-[835px] pl-8 pr-4">
                    <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    to={''}
                                    className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    My Account
                                </Link>
                                <Link
                                    to={''}
                                    className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    My Orders
                                </Link>
                                {profile && (
                                    <Link
                                        to={''}
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
                            <Link to={''}>
                                <Heart className=" text-white hover:scale-125 transition" />
                            </Link>
                        </div>
                    )}
                    <div className="action-icon">
                        <Link to={''}>
                            <ShoppingBag className=" text-white hover:scale-125 transition" />
                        </Link>
                    </div>
                </Flex>
            </Flex>
        </div>
    );
}

export default MainNavbar;
