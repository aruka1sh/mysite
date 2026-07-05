import axios from 'axios';

// Under Vercel, static JSON files in the public directory can be read directly via HTTP GET.
// Dynamic API requests like sending Telegram messages will route through /api/contact serverless function.
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfile = () => api.get('/data/profile.json').then(res => res.data);
export const getEducation = () => api.get('/data/education.json').then(res => res.data);
export const getExperience = () => api.get('/data/experience.json').then(res => res.data);
export const getSkills = () => api.get('/data/skills.json').then(res => res.data);
export const getProjects = () => api.get('/data/projects.json').then(res => res.data);
export const getLanguages = () => api.get('/data/languages.json').then(res => res.data);
export const submitContactMessage = (data) => api.post('/api/contact', data).then(res => res.data);

export default api;
