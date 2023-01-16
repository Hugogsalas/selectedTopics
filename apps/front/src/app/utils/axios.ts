import axios from 'axios';

export const servicesInstance = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 7000,
});

servicesInstance.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
  };

  return config;
});
