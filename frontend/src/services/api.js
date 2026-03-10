import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/signup/', data),
  login: (data) => api.post('/auth/signin/', data),
};

export const conversationService = {
  chat: (data) => api.post('/conversation/', data),
  listConversations: () => api.get('/conversations/'),
  getConversation: (id) => api.get(`/conversations/${id}/`),
};

export default api;
