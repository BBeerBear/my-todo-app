import { Link, Form } from 'react-router-dom';

export default function SignInForm() {
  return (
    <Form method='post' className='flex flex-col text-center gap-2'>
      {/* header */}
      <div className='uppercase font-extrabold tracking-wider'>Sign in</div>
      <div className='splitter'></div>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          id='email'
          name='email'
          required
          placeholder='Input your email'
        />
      </label>
      <label htmlFor='password'>
        Password
        <input
          type='password'
          id='password'
          name='password'
          required
          placeholder='Input your password'
        />
      </label>
      <button
        type='submit'
        className='mt-4 mb-2 bg-gradient-to-r from-orange-300 to-red-400 border-none p-3 text-md font-extrabold rounded-md'
      >
        Sign In
      </button>
      {/* <Link to='forget' className='text-slate-300 hover:underline'>
        Forgot password?
      </Link> */}
      <Link to='?mode=signup' className='text-slate-300 hover:underline'>
        "Don't have a account"
      </Link>
    </Form>
  );
}
