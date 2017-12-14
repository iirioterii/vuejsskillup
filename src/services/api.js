import axios from 'axios';

const BASE_URL = 'http://192.168.10.10';

export const getUsers = () => {
  const url = `${BASE_URL}/api/v1/users`;
  return axios.get(url).then(response => response.data);
};

export const getArticles = () => {
  const url = `${BASE_URL}/api/v1/articles`;
  return axios.get(url).then(response => response.data);
};

export const login = (credentials) => {
  const url = `${BASE_URL}/api/v1/login`;
  return axios.post(url, credentials).then(response => response.data);
};
