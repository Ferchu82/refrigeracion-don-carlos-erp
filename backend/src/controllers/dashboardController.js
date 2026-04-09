import { PrismaClient } from '@prisma/client';
import { getUserIdFromToken } from '../services/authService.js';

const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req.headers.authorization);

        const stats = await prisma.order.groupBy({
            by: ['status', 'priority'],
            where: {
                assignedToId: userId
            },
            _count: {
                id: true
            }
        });

        const statusStats = {
            PENDIENTE: stats.filter(s => s.status === 'PENDIENTE').reduce((sum, s) => sum + s._count.id, 0),
            EN_PROCESO: stats.filter(s => s.status === 'EN_PROCESO').reduce((sum, s) => sum + s._count.id, 0),
            TERMINADA: stats.filter(s => s.status === 'TERMINADA').reduce((sum, s) => sum + s._count.id, 0)
        };

        const priorityStats = {
            NORMAL: stats.filter(s => s.priority === 'NORMAL').reduce((sum, s) => sum + s._count.id, 0),
            URGENTE: stats.filter(s => s.priority === 'URGENTE').reduce((sum, s) => sum + s._count.id, 0)
        };

        const totalOrders = stats.reduce((sum, s) => sum + s._count.id, 0);

        res.json({
            success: true,
            data: {
                totalOrders,
                statusStats,
                priorityStats,
                lastUpdate: new Date().toISOString(),
                technicianId: userId
            }
        });

    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ success: false, error: 'Error obteniendo estadísticas' });
    }
};