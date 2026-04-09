import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const orderService = {
    async getOrdersByTechnician(technicianId) {
        return await prisma.order.findMany({
            where: { technicianId },
            include: {
                technician: {
                    select: { id: true, email: true, role: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    },

    async getOrderById(id, technicianId) {
        return await prisma.order.findFirst({
            where: {
                id,
                technicianId
            },
            include: {
                technician: {
                    select: { id: true, email: true, role: true }
                }
            }
        });
    },

    async createOrder(data) {
        const now = new Date();
        const datePrefix = now.toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(Math.random() * 999) + 1;
        const orderNumber = `ORD-${datePrefix}-${randomNum.toString().padStart(3, '0')}`;

        const { customerName, equipment, status, priority } = data;
        if (!customerName || !equipment) {
            throw new Error('customerName y equipment son requeridos');
        }

        return await prisma.order.create({
            data: {
                orderNumber,
                customerName,
                equipment,
                description: data.description,
                status: data.status || 'PENDIENTE',
                priority: data.priority || 'NORMAL',
                technicianId: data.technicianId
            },
            include: {
                technician: {
                    select: { id: true, email: true, role: true }
                }
            }
        });
    },

    async updateOrder(id, data, technicianId) {
        const order = await prisma.order.findFirst({
            where: { id, technicianId }
        });

        if (!order) return null;

        if (data.status) {
            const validTransitions = {
                PENDIENTE: ['PENDIENTE', 'EN_PROCESO'],
                'EN_PROCESO': ['EN_PROCESO', 'TERMINADA'],
                TERMINADA: ['TERMINADA']
            };

            if (!validTransitions[order.status]?.includes(data.status)) {
                throw new Error(`Transición inválida: ${order.status} → ${data.status}`);
            }
        }

        return await prisma.order.update({
            where: { id },
            data,
            include: {
                technician: {
                    select: { id: true, email: true, role: true }
                }
            }
        });
    },

    async deleteOrder(id, technicianId) {
        const order = await prisma.order.findFirst({
            where: { id, technicianId }
        });

        if (!order) return null;

        await prisma.order.delete({ where: { id } });
        return true;
    }
};