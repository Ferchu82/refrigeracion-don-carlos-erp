import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
            <div className="w-56 flex-shrink-0 bg-gray-900 border-r border-gray-200/50"> {/* w-56 = 224px */}
                <Sidebar />
            </div>
            <main className="flex-1 min-w-0 overflow-y-auto p-3 sm:p-5 lg:p-8">
                <Outlet />
            </main>
        </div>
    </div>
);

export default Layout;