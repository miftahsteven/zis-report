import Axs from 'axios';

const axios = Axs.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const serverAxios = Axs.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
    //const token = useAuthStore.getState().user?.session.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
