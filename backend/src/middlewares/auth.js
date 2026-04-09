import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Token requerido'
            });
        }

        const token = authHeader.split(' ')[1];
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};

export default authMiddleware;