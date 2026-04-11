import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login'; // ← RUTA CORREGIDA

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            token ? (
              <MainLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<div>📦 Productos</div>} />
                  <Route path="clients" element={<div>👥 Clientes</div>} />
                  <Route path="sales" element={<div>💰 Ventas</div>} />
                  <Route path="orders" element={<div>📋 Pedidos</div>} />
                </Routes>
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;