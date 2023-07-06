import { ActionFunction, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export function getTokenDuration() {
  const storedExpirationDate: any = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
export function getAuthToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  return token;
}
export function checkAuthLoaderInHome() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth');
  }
  return token;
}
export const logoutAction: ActionFunction = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  Cookies.remove('user');
  return redirect('/');
};
export function checkAuthLoaderInAuth() {
  const token = getAuthToken();
  if (token) {
    return redirect('/');
  }
  return null;
}
