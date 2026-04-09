import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// ⭐ AUTH IMPORTS ⭐
import authRoutes from './routes/authRoutes.js';
// ⭐ ORDERS IMPORT ⭐
import { orderRoutes } from './routes/orderRoutes.js';  // ← AGREGAR

dotenv.config();

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({ origin: '*' }));

// ⭐ RUTAS AUTH ⭐
app.use('/api/auth', authRoutes);
// ⭐ RUTAS ORDERS ⭐
app.use('/api/orders', orderRoutes);  // ← AGREGAR

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Refrigeración Don Carlos ERP Backend + AUTH + ORDERS ✅'
  });
});

export default app;