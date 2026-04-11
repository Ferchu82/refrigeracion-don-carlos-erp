import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [backendStatus, setBackendStatus] = useState('checking');

    useEffect(() => {
        fetch('http://localhost:5000/api/health')
            .then(res => res.json())
            .then(data => setBackendStatus('ok'))
            .catch(() => setBackendStatus('error'));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Refrigeración Don Carlos
                    </h1>
                    <p className="text-xl text-gray-600">ERP Dashboard</p>
                    <div className={`mt-4 p-2 rounded-full inline-block ${backendStatus === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        Backend: {backendStatus === 'ok' ? '🟢 Conectado' : '🔴 Offline'}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Total Productos</h3>
                        <p className="text-4xl font-black text-blue-600">1,247</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ventas Hoy</h3>
                        <p className="text-4xl font-black text-emerald-600">$45,200</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Órdenes</h3>
                        <p className="text-4xl font-black text-purple-600">23</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Stock Crítico</h3>
                        <p className="text-4xl font-black text-orange-600">3</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;