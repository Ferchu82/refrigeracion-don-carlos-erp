import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('admin@doncarlos.com');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        🛠️ Don Carlos ERP
                    </h1>
                    <p className="text-gray-600">Iniciar sesión</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">{error}</div>}
                    <button type="submit" disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50">
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500">Admin: admin@doncarlos.com / admin123</div>
            </div>
        </div>
    );
};

export default Login;