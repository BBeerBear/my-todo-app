import { Form } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] bg-slate-600 rounded-lg p-3'>
      <div className='flex flex-col text-center'>
        <div className='uppercase font-extrabold tracking-wider'>
          user login
        </div>
        <Form method='post'></Form>
      </div>
    </div>
  );
}
