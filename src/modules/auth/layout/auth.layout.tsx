import React from 'react';
import { ChildNode } from '@/types/common/layout';
import background from '@/assets/images/auth.png';

const AuthLayout: React.FC<ChildNode> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative min-h-screen w-full flex items-center justify-center p-4">
                <div className="absolute inset-0 z-0">
                    <img src={background} alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-app-primary/30" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
