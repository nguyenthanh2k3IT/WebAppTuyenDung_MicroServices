import React, { Suspense } from 'react';
import { ChildNode } from '@/types/common/layout';
import { Link } from 'react-router-dom';
import { ShoppingBag, Lock, CreditCard, User, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AccountNavigate } from '../navigate';
import OrderHistoryModal from '../components/modals/order-history.modal';
import DetailOrderModal from '../components/modals/detail-order.modal';
import useCaller from '@/hooks/useCaller';
import { removeTokens } from '@/helpers/storage.helper';

const AccountLayout: React.FC<ChildNode> = ({ children }) => {
    const { callApi } = useCaller<boolean>();

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

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <OrderHistoryModal />
            <DetailOrderModal />
            <div className="container mx-auto px-4">
                <Link to="/">
                    <h1 className="text-3xl font-bold mb-8 text-center">ASOS</h1>
                </Link>
                <div className="max-w-5xl mx-auto flex gap-6">
                    <div className="w-1/3 sticky top-8 self-start">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                                    TĐ
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Hi,</p>
                                    <p className="font-semibold">Tuấn Nam Đinh</p>
                                </div>
                            </div>
                            <Separator />
                            <nav className="space-y-1">
                                <Link
                                    to={AccountNavigate.order.link}
                                    className="flex items-center py-2 text-gray-600 hover:text-black"
                                >
                                    <ShoppingBag size={20} className="mr-3" />
                                    My orders
                                </Link>
                                <Separator />
                                <Link
                                    to={AccountNavigate.password.link}
                                    className="flex items-center py-2 text-gray-600 hover:text-black"
                                >
                                    <Lock size={20} className="mr-3" />
                                    My Password
                                </Link>
                                <Separator />
                                <Link
                                    to={AccountNavigate.pointHistory.link}
                                    className="flex items-center py-2 text-gray-600 hover:text-black"
                                >
                                    <CreditCard size={20} className="mr-3" />
                                    Point history
                                </Link>
                                <Separator />
                                <Link
                                    to={AccountNavigate.detail.link}
                                    className="flex items-center py-2 text-gray-600 hover:text-black"
                                >
                                    <User size={20} className="mr-3" />
                                    My details
                                </Link>
                                <Separator />
                                <div
                                    onClick={handleLogout}
                                    className="flex items-center py-2 text-gray-600 cursor-pointer hover:text-black"
                                >
                                    <LogOut size={20} className="mr-3" />
                                    Sign out
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="w-2/3">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <Suspense fallback={null}>{children}</Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;
