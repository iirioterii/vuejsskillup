import http from './http';

const BASE_URL = 'http://192.168.10.10';

export const getUsers = () => {
  const url = `${BASE_URL}/api/v1/users`;
  return http.get(url).then(response => response.data);
};

export const getArticles = () => {
  const url = `${BASE_URL}/api/v1/articles`;
  return http.get(url).then(response => response.data);
};

export const login = (credentials) => {
  const url = `${BASE_URL}/api/v1/login`;
  return http.post(url, credentials).then(response => response.data);
};
