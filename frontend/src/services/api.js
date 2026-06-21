import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (name, email, password) => api.post('/register', { name, email, password }),
}

// Resume APIs
export const resumeAPI = {
  upload: (formData) => api.post('/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getHistory: () => api.get('/resumes'),
  delete: (id) => api.delete(`/resumes/${id}`),
}

// Analysis APIs
export const analysisAPI = {
  analyze: (data) => api.post('/analyze', data),
  getResult: (id) => api.get(`/analysis/${id}`),
  getHistory: () => api.get('/analyses'),
}

export default api