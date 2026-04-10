const API_BASE_URL = 'http://localhost:5000/api';

const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const config = {
            headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
            ...options
        };
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        if (!response.ok) throw new Error('Error en la petición');
        return response.json();
    },
    login(email, password) {
        return this.request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    },
    getOrders() { return this.request('/orders'); },
    getStats() { return this.request('/dashboard/stats'); }
};

export default api;