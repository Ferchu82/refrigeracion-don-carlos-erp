import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl p-4">
            <div className="container mx-auto flex justify-between items-center max-w-7xl">
                <h1 className="text-2xl font-bold">🛠️ Don Carlos ERP</h1>
                <div className="flex items-center space-x-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {user?.role}
                    </span>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;  // ← Debe tener esto