// src/routes/orderRoutes.js - IMPORTS CORRECTOS
import express from 'express';
import {
    getOrdersController,
    createOrderController,
    assignOrderController,
    deleteOrderController,
    getDashboardStatsController
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';  // ✅ NUEVO

const router = express.Router();

router.get('/orders', authMiddleware, getOrdersController);
router.post('/orders/create', authMiddleware, createOrderController);
router.post('/orders/assign', authMiddleware, adminMiddleware, assignOrderController);
router.delete('/orders/:id', authMiddleware, adminMiddleware, deleteOrderController);
router.get('/dashboard/stats', authMiddleware, getDashboardStatsController);

export default router;