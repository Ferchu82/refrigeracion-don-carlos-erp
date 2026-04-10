import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
    try {
        console.log('Headers:', req.headers); // DEBUG

        const authHeader = req.headers.authorization;

        console.log('authHeader:', authHeader, typeof authHeader); // DEBUG

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No Authorization header'
            });
        }

        if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Authorization format'
            });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token length:', token.length); // DEBUG

        const user = verifyToken(token);
        console.log('User decoded:', user);
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};

export const getUserIdFromToken = (req) => {
    return req.user.id;
};

export default authMiddleware;