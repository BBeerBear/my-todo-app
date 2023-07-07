import { Link, useSearchParams } from 'react-router-dom';
import SignInForm from './signin';
import RegisterForm from './register';

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';

  return (
    <div className=''>
      <div className='fixed h-32 bg-gradient-to-b from-slate-950 to-slate-800 w-screen p-4 flex justify-between items-start text-2xl'>
        <div className=''>Todoarc</div>
        <div className='flex gap-2'>
          <Link to='?mode=signin'>
            <button className='border-none'>Sign in</button>
          </Link>
          <Link to='?mode=signup'>
            <button>Sign up</button>
          </Link>
        </div>
      </div>
      <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[380px] bg-slate-600 rounded-lg p-5'>
        {!isSignup && <SignInForm />}
        {isSignup && <RegisterForm />}
      </div>
    </div>
  );
}
