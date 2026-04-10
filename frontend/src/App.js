import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';  // ← NUEVO
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout />
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute>
          <Layout />
          <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Órdenes</h2>
            <p className="text-gray-600 text-lg">Lista de órdenes pronto...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/assign" element={
        <ProtectedRoute>
          <Layout />
          <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">👨‍🔧 Asignar Técnico</h2>
            <p className="text-gray-600 text-lg">Solo Admin - Pronto...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </Router>
);

function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}

export default App;