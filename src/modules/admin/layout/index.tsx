import React, { Suspense } from 'react';
import { ChildNode } from '@/types/common/layout';
import AdminSidebar from './components/admin.sidebar';
import AdminNavbar from './components/admin.navbar';
import UpdatePasswordModal from './components/update-password.module';

const AdminLayout: React.FC<ChildNode> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <UpdatePasswordModal />
            <AdminSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminNavbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 px-6 py-4">
                    <Suspense fallback={null}>{children}</Suspense>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
