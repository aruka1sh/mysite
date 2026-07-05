import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfile = () => api.get('/api/profile').then(res => res.data);
export const getEducation = () => api.get('/api/education').then(res => res.data);
export const getExperience = () => api.get('/api/experience').then(res => res.data);
export const getSkills = () => api.get('/api/skills').then(res => res.data);
export const getProjects = () => api.get('/api/projects').then(res => res.data);
export const getLanguages = () => api.get('/api/languages').then(res => res.data);
export const submitContactMessage = (data) => api.post('/api/contact', data).then(res => res.data);

export default api;
