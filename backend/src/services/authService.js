import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class AuthService {
    async register(data) {
        const { name, email, password, phone, role } = data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error('Email ya usado');

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, phone, role }
        });

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    async login(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Email o password incorrecto');

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error('Email o password incorrecto');

        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    async getUserById(id) {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) throw new Error('Usuario no encontrado');
        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}

export default new AuthService();