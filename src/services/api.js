import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Products
export const fetchAllProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchProductsByCategory = (category) =>
  api.get(`/products/category/${encodeURIComponent(category)}`);
export const fetchCategories = () => api.get('/products/categories');

export default api;
