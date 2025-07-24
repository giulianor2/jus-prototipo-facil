import axios from 'axios';

// Configure a URL base para seu backend Django
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://seu-backend-django.com/api'  // URL de produção
  : 'http://localhost:8000/api';           // URL de desenvolvimento

// Instância configurada do axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação (quando implementar)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - redirecionar para login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);