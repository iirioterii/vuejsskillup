import axios from 'axios';
import { getJWTToken } from './auth';

const axiosInstance = axios.create({
  headers: {
    Authorization: getJWTToken(),
  },
});

axiosInstance.interceptors.request.use(config =>
  // Do something before request is sent
   config, error =>
  // Do something with request error
   Promise.reject(error));

// Add a response interceptor
axiosInstance.interceptors.response.use(response =>
  response, (error) => {
  throw error;
});

export default axiosInstance;
