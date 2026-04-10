// src/config.js - CONFIGURACIÓN BASE MÓDULO 5
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || 'refrigeracion-don-carlos-super-secreto-jwt-2024';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Database (Prisma maneja conexión)
export const DATABASE_URL = process.env.DATABASE_URL;

// Configuración adicional
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';