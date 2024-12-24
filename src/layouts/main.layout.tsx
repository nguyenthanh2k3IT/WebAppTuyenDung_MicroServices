import React, { Suspense } from 'react';
import Navbar from './components/main.navbar';
import Footer from './components/main.footer';
import { ChildNode } from '@/types/common/layout';

const MainLayout: React.FC<ChildNode> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Suspense fallback={null}>{children}</Suspense>
            <Footer />
        </div>
    );
};

export default MainLayout;
