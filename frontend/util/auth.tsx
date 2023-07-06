import { ActionFunction, redirect } from 'react-router-dom';

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
export function tokenLoader() {
  const token = getAuthToken();
  return token;
}
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth');
  }
  return null;
}
export const logoutAction: ActionFunction = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
};
