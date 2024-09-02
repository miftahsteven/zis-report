import axios from 'axios';

const api = axios.create({
  //baseURL: `${import.meta.env.REACT_APP_BASEURL}`,
  baseURL: process.env.REACT_APP_BASEURL,
  //  baseURL: `https://api.zisindosat.id`,
  // baseURL: `http://localhost:3034`,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert('session check: silahkan login kembali');
      return (window.location.href = '/auth/login');
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenizer');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
