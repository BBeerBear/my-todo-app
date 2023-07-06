import { Link, Form, useActionData } from 'react-router-dom';

export default function RegisterForm() {
  const data: any = useActionData();
  return (
    <Form method='post' className='flex flex-col text-center gap-3'>
      {/* header */}
      <div className='uppercase font-extrabold tracking-wider'>Sign Up</div>
      <div className='splitter'></div>
      <input type='text' name='username' required placeholder='Username' />
      <div className='flex justify-between gap-3'>
        <input
          type='text'
          name='first_name'
          required
          placeholder='First Name'
        />
        <input type='text' name='last_name' required placeholder='Last Name' />
      </div>
      <input
        type='number'
        id='phone_number'
        name='phone_number'
        required
        placeholder='Phone Number'
      />
      <input
        type='email'
        id='email'
        name='email'
        required
        placeholder='Email'
      />
      <input
        type='password'
        name='password'
        required
        placeholder='New password'
      />
      <input
        type='password'
        name='verify_password'
        required
        placeholder='Verify your password'
      />
      {data && data.detail && (
        <div className='text-red-500'>Error: {data.detail}</div>
      )}
      <button
        type='submit'
        className='mt-1 mb-2 bg-gradient-to-r from-orange-300 to-red-400 border-none p-3 text-md font-extrabold rounded-md'
      >
        Register
      </button>
      <Link to='?mode=signin' className='text-slate-300 hover:underline'>
        Already have an account? Sign In
      </Link>
    </Form>
  );
}
