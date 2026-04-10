import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const adminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token requerido' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.role !== 'ADMIN') {
      return res.status(403).json({ 
        success: false, 
        message: 'Acceso solo para ADMIN' 
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error.message);
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};
