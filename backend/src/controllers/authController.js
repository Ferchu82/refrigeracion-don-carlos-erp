import authService from '../services/authService.js';
import { generateToken } from '../utils/jwt.js';

export class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password, phone, role = 'TECNICO' } = req.body;
            const user = await authService.register({ name, email, password, phone, role });
            const token = generateToken({ id: user.id, email: user.email, role: user.role });
            res.status(201).json({ success: true, message: 'Usuario registrado', data: { user, token } });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            const token = generateToken({ id: user.id, email: user.email, role: user.role });
            res.json({ success: true, message: 'Login OK', data: { user, token } });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }

    static async me(req, res) {
        try {
            const user = await authService.getUserById(req.user.id);
            res.json({ success: true, data: { user } });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static protected(req, res) {
        res.json({ success: true, message: 'PROTEGIDO OK', user: req.user });
    }
}

export default AuthController;