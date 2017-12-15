import router from '@/router';
import decode from 'jwt-decode';

const JWT_TOKEN_KEY = 'vujsskilluptoken';

function clearJWTToken() {
  localStorage.removeItem(JWT_TOKEN_KEY);
}

export function getJWTToken() {
  return localStorage.getItem(JWT_TOKEN_KEY);
}

export function logout() {
  clearJWTToken();
  router.push('/');
}

export function setJWTToken(jwtToken) {
  return localStorage.setItem(JWT_TOKEN_KEY, jwtToken);
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
  const jwtToken = getJWTToken();
  return !!jwtToken && !isTokenJWTExpired(jwtToken);
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next('/login');
  } else {
    next();
  }
}

export function redirectIfLogged(to, from, next) {
  if (isLoggedIn()) {
    next('/');
  } else {
    next();
  }
}
