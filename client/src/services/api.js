import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  verify: () => api.get('/auth/verify'),
};

export const settingsAPI = { get: () => api.get('/settings'), update: (d) => api.put('/settings', d) };
export const sliderAPI = { getAll: () => api.get('/sliders'), getAllAdmin: () => api.get('/sliders/all'), create: (d) => api.post('/sliders', d), update: (id, d) => api.put(`/sliders/${id}`, d), delete: (id) => api.delete(`/sliders/${id}`) };
export const aboutAPI = { getAll: () => api.get('/about'), get: (s) => api.get(`/about${s ? `?section=${s}` : ''}`), create: (d) => api.post('/about', d), update: (id, d) => api.put(`/about/${id}`, d), delete: (id) => api.delete(`/about/${id}`) };
export const newsAPI = { getAll: () => api.get('/news'), getFeatured: () => api.get('/news/featured'), getAllAdmin: () => api.get('/news/all'), create: (d) => api.post('/news', d), update: (id, d) => api.put(`/news/${id}`, d), delete: (id) => api.delete(`/news/${id}`) };
export const galleryAPI = { getAlbums: () => api.get('/albums'), getAllAlbums: () => api.get('/albums/all'), getImages: (a) => api.get(`/gallery${a ? `?albumId=${a}` : ''}`), uploadImage: (d) => api.post('/gallery', d) };
export const enquiryAPI = { submit: (d) => api.post('/enquiries', d), getAll: () => api.get('/enquiries') };
export const contactAPI = { submit: (d) => api.post('/contacts', d), getAll: () => api.get('/contacts') };
export const subscriberAPI = { subscribe: (d) => api.post('/subscribers', d), getAll: () => api.get('/subscribers'), delete: (id) => api.delete(`/subscribers/${id}`) };
export const uploadAPI = { upload: (file) => { const fd = new FormData(); fd.append('file', file); return api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); } };

const crud = (r) => ({ getAll: () => api.get(`/${r}`), getAllAdmin: () => api.get(`/${r}/all`), create: (d) => api.post(`/${r}`, d), update: (id, d) => api.put(`/${r}/${id}`, d), delete: (id) => api.delete(`/${r}/${id}`) });
export const facultyAPI = crud('faculty');
export const testimonialAPI = crud('testimonials');
export const achievementAPI = crud('achievements');
export const facilityAPI = crud('facilities');
export const faqAPI = crud('faqs');
export const announcementAPI = crud('announcements');
export const busRouteAPI = crud('bus-routes');
export const downloadAPI = crud('downloads');
export const eventAPI = crud('events');
export const leadershipAPI = crud('leadership');
export const studentLeaderAPI = crud('student-leaders');
export const popupAPI = { getActive: () => api.get('/popups/active'), getAll: () => api.get('/popups'), create: (d) => api.post('/popups', d), update: (id, d) => api.put(`/popups/${id}`, d), delete: (id) => api.delete(`/popups/${id}`) };
export const visitorAPI = { increment: () => api.get('/visitors/increment'), getCount: () => api.get('/visitors') };

export default api;
