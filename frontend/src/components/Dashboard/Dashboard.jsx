import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatsCard from './StatsCard';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        technicians: 0,
        completedOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getStats()
            .then((data) => {
                console.log('✅ Stats del backend:', data.data);
                setStats(data.data || { totalOrders: 0, pendingOrders: 0, technicians: 0, completedOrders: 0 });
                setLoading(false);
            })
            .catch((error) => {
                console.error('❌ Error stats:', error);
                setLoading(false);
            });
    }, []);  // ✅ Sin warning

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 px-4">
                <div className="text-2xl md:text-3xl text-gray-500 animate-pulse mb-4">
                    🔄 Cargando estadísticas...
                </div>
                <div className="text-sm text-gray-400">Conectando con backend...</div>
            </div>
        );
    }

    return (
        <div className="w-full px-2 sm:px-4 lg:px-0 space-y-6 md:space-y-8 max-w-none">
            {/* Header Dashboard */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">
                        📊 Dashboard
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600">
                        Bienvenido <span className="font-semibold text-gray-900">{user?.email}</span>
                    </p>
                </div>
                <div className="text-right flex-shrink-0 min-w-[100px]">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                        {stats.totalOrders || 0}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">Órdenes totales</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
                <StatsCard
                    title="Pendientes"
                    value={stats.pendingOrders || 0}
                    icon="⏳"
                    bgColor="bg-orange-500 hover:bg-orange-600"
                />
                <StatsCard
                    title="Técnicos"
                    value={stats.technicians || 0}
                    icon="👨‍🔧"
                    bgColor="bg-green-500 hover:bg-green-600"
                />
                <StatsCard
                    title="Completadas"
                    value={stats.completedOrders || 0}
                    icon="✅"
                    bgColor="bg-emerald-500 hover:bg-emerald-600"
                />
            </div>

            {/* Debug info TEMPORAL */}
            <div className="text-xs text-gray-500 text-center p-3 bg-gray-50 border border-gray-200 rounded-lg mt-8 opacity-75">
                Debug: {JSON.stringify(stats)}
            </div>
        </div>
    );
};

export default Dashboard;