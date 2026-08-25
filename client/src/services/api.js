import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth services
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  verify: () => api.get('/auth/verify'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Settings services
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

// Slider services
export const sliderAPI = {
  getAll: () => api.get('/sliders'),
  getAllAdmin: () => api.get('/sliders/all'),
  create: (data) => api.post('/sliders', data),
  update: (id, data) => api.put(`/sliders/${id}`, data),
  delete: (id) => api.delete(`/sliders/${id}`),
};

// About services
export const aboutAPI = {
  getAll: () => api.get('/about'),
  get: (section) => api.get(`/about${section ? `?section=${section}` : ''}`),
  create: (data) => api.post('/about', data),
  update: (id, data) => api.put(`/about/${id}`, data),
  delete: (id) => api.delete(`/about/${id}`),
};

// News services
export const newsAPI = {
  getAll: () => api.get('/news'),
  getFeatured: () => api.get('/news/featured'),
  getAllAdmin: () => api.get('/news/all'),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};

// Gallery services
export const galleryAPI = {
  getAlbums: () => api.get('/albums'),
  getAllAlbums: () => api.get('/albums/all'),
  createAlbum: (data) => api.post('/albums', data),
  updateAlbum: (id, data) => api.put(`/albums/${id}`, data),
  deleteAlbum: (id) => api.delete(`/albums/${id}`),
  getImages: (albumId) => api.get(`/gallery${albumId ? `?albumId=${albumId}` : ''}`),
  uploadImage: (data) => api.post('/gallery', data),
  updateImage: (id, data) => api.put(`/gallery/${id}`, data),
  deleteImage: (id) => api.delete(`/gallery/${id}`),
};

// Enquiry services
export const enquiryAPI = {
  submit: (data) => api.post('/enquiries', data),
  getAll: () => api.get('/enquiries'),
  update: (id, data) => api.put(`/enquiries/${id}`, data),
  delete: (id) => api.delete(`/enquiries/${id}`),
};

// Contact services
export const contactAPI = {
  submit: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Subscriber services
export const subscriberAPI = {
  subscribe: (data) => api.post('/subscribers', data),
  getAll: () => api.get('/subscribers'),
  delete: (id) => api.delete(`/subscribers/${id}`),
};

// Generic CRUD factory for simple resources
const createCRUDAPI = (resource) => ({
  getAll: () => api.get(`/${resource}`),
  getAllAdmin: () => api.get(`/${resource}/all`),
  create: (data) => api.post(`/${resource}`, data),
  update: (id, data) => api.put(`/${resource}/${id}`, data),
  delete: (id) => api.delete(`/${resource}/${id}`),
});

export const facultyAPI = createCRUDAPI('faculty');
export const testimonialAPI = createCRUDAPI('testimonials');
export const achievementAPI = createCRUDAPI('achievements');
export const facilityAPI = createCRUDAPI('facilities');
export const faqAPI = createCRUDAPI('faqs');
export const announcementAPI = createCRUDAPI('announcements');
export const busRouteAPI = createCRUDAPI('bus-routes');
export const downloadAPI = createCRUDAPI('downloads');
export const eventAPI = createCRUDAPI('events');
export const leadershipAPI = createCRUDAPI('leadership');
export const studentLeaderAPI = createCRUDAPI('student-leaders');

export const popupAPI = {
  getActive: () => api.get('/popups/active'),
  getAll: () => api.get('/popups'),
  create: (data) => api.post('/popups', data),
  update: (id, data) => api.put(`/popups/${id}`, data),
  delete: (id) => api.delete(`/popups/${id}`),
};

export const visitorAPI = {
  increment: () => api.get('/visitors/increment'),
  getCount: () => api.get('/visitors'),
};

// File upload — returns { url }
export const uploadAPI = {
  upload: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};
