import axios from 'axios';
import Router from 'vue-router';
import decode from 'jwt-decode';
import { login } from './api';

const JWT_TOKEN_KEY = 'vujsskilluptoken';


const router = new Router({
  mode: 'history',
});

function clearJWTToken() {
  localStorage.removeItem(JWT_TOKEN_KEY);
}

export function getJWTToken() {
  return localStorage.getItem(JWT_TOKEN_KEY);
}

export function logout() {
  clearJWTToken();
  router.go('/');
}

// Get and store id_token in local storage
export function setJWTToken(jwtToken) {
  localStorage.setItem(JWT_TOKEN_KEY, jwtToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenJWTExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function isLoggedIn() {
  const idToken = getJWTToken();
  return !!idToken && !isTokenJWTExpired(idToken);
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

