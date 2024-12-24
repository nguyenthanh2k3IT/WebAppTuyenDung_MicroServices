import React, { Suspense } from 'react';
import AdminNavbar from '@/modules/admin/layout/components/admin.navbar';
import AdminSidebar from '@/modules/admin/layout/components/admin.sidebar';
import { ChildNode } from '@/types/common/layout';

const AdminLayout: React.FC<ChildNode> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminNavbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <Suspense fallback={null}>{children}</Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
