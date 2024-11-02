import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
    
  logout: () => api.post('/auth/logout'),
  
  getProfile: () => api.get('/auth/profile')
};

// Collections endpoints
export const collections = {
  getAll: () => api.get('/collections'),
  
  getById: (id: string) => api.get(`/collections/${id}`),
  
  create: (data: {
    title: string;
    description: string;
    content: string;
    type: string;
  }) => api.post('/collections', data),
  
  update: (id: string, data: Partial<{
    title: string;
    description: string; 
    content: string;
    type: string;
  }>) => api.put(`/collections/${id}`, data),
  
  delete: (id: string) => api.delete(`/collections/${id}`)
};

// Research endpoints
export const research = {
  getAll: () => api.get('/research'),
  
  getById: (id: string) => api.get(`/research/${id}`),
  
  create: (data: {
    title: string;
    abstract: string;
    methodology: string;
    findings: string;
    conclusion: string;
  }) => api.post('/research', data),
  
  update: (id: string, data: Partial<{
    title: string;
    abstract: string;
    methodology: string;
    findings: string;
    conclusion: string;
  }>) => api.put(`/research/${id}`, data),
  
  delete: (id: string) => api.delete(`/research/${id}`)
};

// Experiments endpoints
export const experiments = {
  getAll: () => api.get('/experiments'),
  
  getById: (id: string) => api.get(`/experiments/${id}`),
  
  create: (data: {
    title: string;
    description: string;
    config: Record<string, any>;
    type: string;
  }) => api.post('/experiments', data),
  
  update: (id: string, data: Partial<{
    title: string;
    description: string;
    config: Record<string, any>;
    type: string;
  }>) => api.put(`/experiments/${id}`, data),
  
  delete: (id: string) => api.delete(`/experiments/${id}`)
};

export default api;