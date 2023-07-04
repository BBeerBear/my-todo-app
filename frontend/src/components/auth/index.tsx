import { useSearchParams } from 'react-router-dom';
import SignInForm from './signin';
import RegisterForm from './register';

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'signin';

  return (
    <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[380px] bg-slate-600 rounded-lg p-8'>
      {isLogin && <SignInForm />}
      {!isLogin && <RegisterForm />}
    </div>
  );
}