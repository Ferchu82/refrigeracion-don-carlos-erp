import { orderService } from '../services/orderService.js';

export const orderController = {
    getOrders: async (req, res) => {
        try {
            const orders = await orderService.getOrdersByTechnician(req.user.id);
            res.json({
                success: true,
                data: orders,
                count: orders.length
            });
        } catch (error) {
            console.error('Error en getOrders:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderById(id, req.user.id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada o no tienes acceso'
                });
            }

            res.json({ success: true, data: order });
        } catch (error) {
            console.error('Error en getOrderById:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    createOrder: async (req, res) => {
        try {
            const orderData = {
                ...req.body,
                technicianId: req.user.id
            };

            const order = await orderService.createOrder(orderData);
            res.status(201).json({ success: true, data: order });
        } catch (error) {
            console.error('Error en createOrder:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await orderService.updateOrder(id, req.body, req.user.id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada o no tienes acceso'
                });
            }

            res.json({ success: true, data: order });
        } catch (error) {
            console.error('Error en updateOrder:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await orderService.deleteOrder(id, req.user.id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Orden no encontrada o no tienes acceso'
                });
            }

            res.json({ success: true, message: 'Orden eliminada correctamente' });
        } catch (error) {
            console.error('Error en deleteOrder:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
};