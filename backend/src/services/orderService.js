import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getOrders = async (user) => {
    if (user.role === 'ADMIN' || user.role === 'SUPERVISOR') {
        return prisma.order.findMany({
            include: {
                user: true,
                assignedTo: true
            }
        });
    }
    return prisma.order.findMany({
        where: {
            OR: [
                { userId: user.id },
                { assignedToId: user.id }
            ]
        },
        include: {
            user: true,
            assignedTo: true
        }
    });
};

export const createOrder = async (orderData, user) => {
    return prisma.order.create({
        data: {
            ...orderData,
            userId: user.id
        }
    });
};

export const updateOrder = async (id, data, user) => {
    if (user.role === 'ADMIN' || user.role === 'SUPERVISOR') {
        return prisma.order.update({
            where: { id },
            data
        });
    }
    return prisma.order.update({
        where: {
            id_userId: {
                id,
                userId: user.id
            }
        },
        data
    });
};

// ✅ FIX DEFINITIVO - Solo campos que EXISTEN
export const assignOrder = async (orderId, technicianId, user) => {
    if (user.role !== 'ADMIN' && user.role !== 'SUPERVISOR') {
        throw new Error('Solo ADMIN/SUPERVISOR pueden asignar órdenes');
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
        throw new Error('Orden no encontrada');
    }

    // ✅ Asignación SIMPLE - sin validaciones extras
    return prisma.order.update({
        where: { id: orderId },
        data: {
            assignedTo: {
                connect: { id: technicianId }
            }
        },
        include: {
            assignedTo: true  // ✅ Todos los campos del técnico
        }
    });
};

export const getOrderById = async (id, user) => {
    if (user.role === 'ADMIN' || user.role === 'SUPERVISOR') {
        return prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                assignedTo: true
            }
        });
    }
    return prisma.order.findFirst({
        where: {
            id,
            OR: [
                { userId: user.id },
                { assignedToId: user.id }
            ]
        },
        include: {
            user: true,
            assignedTo: true
        }
    });
};

export const deleteOrder = async (id, user) => {
    if (user.role !== 'ADMIN' && user.role !== 'SUPERVISOR') {
        throw new Error('Solo ADMIN/SUPERVISOR pueden eliminar órdenes');
    }

    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
        throw new Error('Orden no encontrada');
    }

    return prisma.order.delete({
        where: { id }
    });
};

export const getDashboardStats = async (user) => {
    try {
        const baseWhere = user.role === 'ADMIN' ? {} : { assignedToId: user.id };

        const totalOrders = await prisma.order.count({ where: baseWhere });
        const pendingOrders = await prisma.order.count({
            where: {
                ...baseWhere,
                status: { equals: 'PENDING' }
            }
        });

        const technicians = user.role === 'ADMIN'
            ? await prisma.user.count({ where: { role: 'TECHNICIAN' } })
            : 0;

        return {
            totalOrders,
            pendingOrders,
            assignedOrders: totalOrders - pendingOrders,
            technicians
        };
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return {
            totalOrders: 0,
            pendingOrders: 0,
            assignedOrders: 0,
            technicians: 0
        };
    }
};