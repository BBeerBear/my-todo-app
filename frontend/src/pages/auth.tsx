import { ActionFunction, json, redirect } from 'react-router-dom';
import AuthForm from '../components/auth';

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
    const loginUser = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    //login
  } else {
    const registerUser = {
      username: formData.get('username'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone_number: formData.get('phone_number'),
      password: formData.get('password'),
    };
    //register
  }

  return redirect('/');
};
