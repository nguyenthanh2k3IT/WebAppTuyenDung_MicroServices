import React, { Suspense } from 'react';
import Navbar from '@/layouts/components/main.navbar';
import { ChildNode } from '@/types/common/layout';
import { Breadcrumb } from '@/components/breadcrumb';

const ProductLayout: React.FC<ChildNode> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Breadcrumb />
            <Suspense fallback={null}>{children}</Suspense>
        </div>
    );
};

export default ProductLayout;
