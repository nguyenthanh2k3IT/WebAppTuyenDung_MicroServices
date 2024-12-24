import React, { Suspense } from 'react';
import { ChildNode } from '@/types/common/layout';
import { Link } from 'react-router-dom';
import { HomeNavigate } from '@/modules/home/navigate';

const AuthLayout: React.FC<ChildNode> = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Link to={HomeNavigate.home.link}>
                <h1 className="text-4xl font-bold mb-8">ASOS</h1>
            </Link>
            <Suspense fallback={null}>{children}</Suspense>
            <footer className="mt-8 text-sm text-gray-600">
                <a href="#" className="hover:underline">
                    Privacy Policy
                </a>{' '}
                |{' '}
                <a href="#" className="hover:underline">
                    Terms and Conditions
                </a>
            </footer>
        </div>
    );
};

export default AuthLayout;
