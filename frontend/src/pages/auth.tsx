import { ActionFunction, json, redirect } from 'react-router-dom';
import AuthForm from '../components/auth';
import axios from 'axios';
import Cookies from 'js-cookie';
export default function AuthPage() {
  return <AuthForm />;
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'signin'; // default mode=signin

  // login
  if (mode !== 'signin' && mode !== 'register') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const formData = await request.formData();
  if (mode === 'signin') {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/token`,
        {
          username: formData.get('email'),
          password: formData.get('password'),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      localStorage.setItem('token', data.access_token);
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 30);
      localStorage.setItem('expiration', expiration.toISOString());

      // save current user data in Cookies
      const {
        data: { id, hashed_password, ...userData },
      } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: 'Bearer ' + data.access_token,
          },
        }
      );
      Cookies.set('user', JSON.stringify(userData));

      return redirect('/');
    } catch (err: any) {
      if (err.response.status == 422) {
        return err;
      }
      throw json(
        { message: err.response.data.detail },
        {
          status: err.response.status,
        }
      );
    }
  } else {
    //register
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/register`,
        {
          email: formData.get('email'),
          username: formData.get('username'),
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          password: formData.get('password'),
          verify_password: formData.get('verify_password'),
          phone_number: formData.get('phone_number'),
          role: 'user',
        }
      );
      localStorage.setItem('token', data.access_token);
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 30);
      localStorage.setItem('expiration', expiration.toISOString());

      // save current user data in Cookies
      const {
        data: { id, hashed_password, ...userData },
      } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: 'Bearer ' + data.access_token,
          },
        }
      );
      Cookies.set('user', JSON.stringify(userData));

      return redirect('/');
    } catch (err: any) {
      if (err.response.status == 422) {
        return err.response.data;
      }
      throw json(
        { message: err.response.data.detail },
        { status: err.response.status }
      );
    }
  }
};
