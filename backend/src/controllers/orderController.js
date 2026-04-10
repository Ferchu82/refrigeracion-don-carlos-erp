// src/controllers/orderController.js - VERSIÓN LIMPIA SIN DUPLICADOS
import {
    getOrders,
    createOrder,
    assignOrder,
    deleteOrder,
    getDashboardStats
} from '../services/orderService.js';

export const getOrdersController = async (req, res) => {
    try {
        const orders = await getOrders(req.user);
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
};

export const createOrderController = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await createOrder(orderData, req.user);
        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error creating order'
        });
    }
};

export const assignOrderController = async (req, res) => {
    try {
        const { orderId, technicianId } = req.body;
        const result = await assignOrder(orderId, technicianId, req.user);
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Assign order error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error assigning order'
        });
    }
};

export const deleteOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteOrder(id, req.user);
        res.json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
        console.error('Delete order error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error deleting order'
        });
    }
};

export const getDashboardStatsController = async (req, res) => {
    try {
        const stats = await getDashboardStats(req.user);
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats'
        });
    }
};