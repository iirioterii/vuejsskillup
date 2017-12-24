import http from 'axios';
import { getJWTToken } from './auth';

const BASE_URL = 'http://192.168.10.10';

const postJsonApiConfig = () => ({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    Authorization: getJWTToken(),
  },
});

const getJsonApiConfig = () => ({
  headers: {
    Authorization: getJWTToken(),
  },
});

export const getUsers = () => {
  const url = `${BASE_URL}/api/v1/users`;
  return http.get(url).then(response => response.data);
};

export const getArticles = () => {
  const url = `${BASE_URL}/api/v1/articles?include=users`;
  return http.get(url, getJsonApiConfig()).then(response => response.data);
};

export const getArticle = (id) => {
  const url = `${BASE_URL}/api/v1/articles/${id}`;
  return http.get(url, getJsonApiConfig()).then(response => response.data);
};

export const postArticle = (data) => {
  const url = `${BASE_URL}/api/v1/articles`;
  return http.post(url, data, postJsonApiConfig()).then(response => response.data);
};

export const updateArticle = (id, data) => {
  const url = `${BASE_URL}/api/v1/articles/${id}`;
  return http.patch(url, data, postJsonApiConfig()).then(response => response.data);
};

export const removeArticle = (id) => {
  const url = `${BASE_URL}/api/v1/articles/${id}`;
  return http.delete(url, getJsonApiConfig()).then(response => response.data);
};

export const login = (credentials) => {
  const url = `${BASE_URL}/api/v1/login`;
  return http.post(url, credentials).then(response => response.data);
};
