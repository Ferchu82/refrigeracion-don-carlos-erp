import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    return (
        <nav className="h-full flex flex-col p-3 space-y-1 bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Logo/Title pequeño */}
            <div className="p-2 mb-4 border-b border-gray-700">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">ERP</h3>
            </div>

            {/* Menu compacto */}
            <div className="flex-1 space-y-1">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center p-2.5 text-sm rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`
                    }
                >
                    <span className="w-5 mr-2 text-lg">📊</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `flex items-center p-2.5 text-sm rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`
                    }
                >
                    <span className="w-5 mr-2 text-lg">📋</span>
                    Órdenes
                </NavLink>

                {isAdmin && (
                    <NavLink
                        to="/assign"
                        className={({ isActive }) =>
                            `flex items-center p-2.5 text-sm rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        <span className="w-5 mr-2 text-lg">👨‍🔧</span>
                        Asignar
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Sidebar;