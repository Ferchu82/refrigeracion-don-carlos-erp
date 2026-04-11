import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { icon: '📊', label: 'Dashboard', path: '/' },
    { icon: '📦', label: 'Productos', path: '/products' },
    { icon: '👥', label: 'Clientes', path: '/clients' },
    { icon: '💰', label: 'Ventas', path: '/sales' },
    { icon: '📋', label: 'Pedidos', path: '/orders' },
];

export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation();

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-200 ease-in-out
      `}>
                <div className="flex items-center justify-center h-16 px-4 bg-blue-600 text-white">
                    <h1 className="text-xl font-bold">Don Carlos</h1>
                </div>

                <nav className="mt-8 px-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center px-4 py-3 mb-2 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === item.path
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }
              `}
                            onClick={onClose}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}